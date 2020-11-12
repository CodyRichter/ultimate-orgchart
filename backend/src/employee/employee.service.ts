import { ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "./employee.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
    @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>

  ) { }

  async createEmployee(newEmployee: Employee & EmployeeAuth & { employeeId?: number, managerId?: number }): Promise<Employee> {

    //await this.waitForMongooseConnection(mongoose);
    const session = await this.employeeModel.db.startSession();
     session.startTransaction();
    try {
      if (!newEmployee._id && newEmployee.employeeId) {
        newEmployee._id = newEmployee.employeeId;
      }

      if (!newEmployee.manager && newEmployee.managerId) {
        newEmployee.manager = newEmployee.managerId;
      }
      newEmployee.password = await bcrypt.hash(newEmployee.password, 10);

      const createdEmployee = new this.employeeModel(newEmployee);
      const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
      const manager = await this.employeeModel.findById(newEmployee.manager).session(session).exec();
      
      await this.employeeAuthModel.create([createdEmployeeAuth],{session:session});
      const employees=await this.employeeModel.create([createdEmployee],{session:session});
      const employee = employees[0]
      
      if (manager) {
        manager.manages.push(employee);
        await manager.save();
      } else if (newEmployee.manager) {
        throw new NotFoundException(`Manager not found for employee ${employee.firstName} ${employee.lastName}`);
      }

      await session.commitTransaction();
      return employee;
    } 
    catch (error) {

      await session.abortTransaction();
     
      if (error.code === 11000) {
        throw new ConflictException("Employee already exists");
      } 

      throw error;

    } finally {

      session.endSession();
     
    }


  }

  
  async createEmployees(newEmployees: (Employee & EmployeeAuth & { employeeId?: number, managerId?: number })[]): Promise<Employee[]> {
    
    const session =await this.employeeModel.db.startSession();

    session.startTransaction();

    try {
      // return await Promise.all(newEmployees.map(async emp => {
      //   return await this.createEmployee(emp)
      // }))
     
      
      const updatedEmployees = await Promise.all(newEmployees.map(
        async (employee) => {
          return { ...employee, manager: (!employee.manager && employee.managerId ? employee.managerId : employee.manager), _id: (!employee._id && employee.employeeId ? employee.employeeId : employee._id), password: await bcrypt.hash(employee.password, 10) };
          // const createdEmployee = new this.employeeModel(newEmployee);
          // const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
          // await this.employeeAuthModel.create(createdEmployeeAuth)
          // await this.employeeModel.create(createdEmployee);
          // return createdEmployee;
        }));
      await this.employeeAuthModel.create(updatedEmployees,{session:session});
      const savedEmployees = await this.employeeModel.create(updatedEmployees,{session:session});
      const allEmployees = await this.employeeModel.find().session(session).exec();

      // console.log(savedEmployees);
      // console.log(allEmployees);

      await Promise.all(savedEmployees.map(emp1 => {
        if (emp1.manager) {
          const index = allEmployees.findIndex(emp2 => emp2._id === emp1.manager);
          if (index) {
            allEmployees[index].manages.push(emp1);
          } else {
            throw new NotFoundException(`Manager not found for employee ${emp1.firstName} ${emp1.lastName}`);
          }
        }
      }));

      // console.log('here');

      // console.log(allEmployees);
      
      await Promise.all(allEmployees.map(async emp => {
        // console.log(emp.manages);
        // using the findByIdAndUpdate command throws an error when trying to save a reference - use .save instead.
        await emp.save();
      }));

      await session.commitTransaction();
      return savedEmployees;
    } catch (error) {

      session.abortTransaction();

      if (error.code === 11000) {
        throw new ConflictException("An Employee in the specified data already exists");
      }

      throw error;
    }finally{

      session.endSession();
    }
  }

  async findAllEmployees(): Promise<Employee[]> {
    return await this.employeeModel.find().populate('projects').populate('manages').populate('manager').exec();
  }

  // async getManagersManager(employeeId: number, managerHeight: number, populateDepth: number): Promise<Employee> {
  //   let employee = await this.employeeModel.findById(employeeId).exec()
  //   for (let i = 0; i < managerHeight; i++) {
  //     if (employee.manager) {
  //       employee = await this.employeeModel.findById(employee.manager).exec()
  //     } else {
  //       break;
  //     }
  //   }
  //   employee.manages = await this.getManages(employee._id, populateDepth);
  //   return employee;
  // }

  async getManages(managerId: number, depth: number): Promise<Employee[]> {

    let populate = { path: 'projects manager' };

    for (let i = 0; i < depth; i++) {
      const temp = { path: 'manages projects manager', populate: populate }
      populate = temp;
    }
    return await this.employeeModel.find({ manager: managerId }).populate(populate).exec();
  }

  // async findEmployee(employee: Partial<Employee>): Promise<Employee> {
  //   return await this.employeeModel.findOne(employee).exec();
  // }

  // returns employee data by id
  async findEmployeeById(employeeId: number): Promise<Employee> {
    return await this.employeeModel.findById(employeeId).populate('manages').populate('projects').populate('manager').exec();
  }


  // updates details fields of an employee model 
  async updateEmployeeData(employeeId: number, update: Employee): Promise<Employee> {
    const employee = await this.employeeModel.findById(employeeId).exec(); 
    // verify only allowed fields are updated (ToDo):

    // check manager is the same, manages is the same, projects is the same

    await employee.save();
    return employee
  }

  // removes a single employee from db if request is valid
  // returns true if successful, false otherwise
  //async deleteEmployee(requester: EmployeeAuth, employee: Employee): Promise<boolean> {
  async deleteEmployee(employeeId: number): Promise<Employee> {
    // delete employee from db
    const session= await this.employeeModel.db.startSession();

    session.startTransaction();
    try{
    const employee = await this.employeeModel.findById(employeeId).session(session).exec();
    // const returnDoc = await this.employeeModel.findByIdAndDelete(employeeId).exec();
    if (employee) {
      const manager = await this.employeeModel.findById(employee.manager).session(session).exec();
      if (manager) {
        manager.manages = manager.manages.filter((emp: number) => emp !== employee._id);
        await manager.save();
      }
      employee.deleteOne();
      await this.employeeAuthModel.findByIdAndDelete(employeeId).session(session).exec();
    } else {
      throw new NotFoundException('Employee not found')
    }
   
    await session.commitTransaction();
    return employee;
  }catch(error)
  {
    session.abortTransaction();

    throw error
  }finally{
    session.endSession();
  }  
  }

  async findEmployeeByFilter(query:any):Promise<Employee[]>
  {
    //if  query  is null return all employees

      if(query===null)
      {
        query = {};
      }
      //if the key is mismatching the field, then we will return empty array
      return await this.employeeModel.find(query).populate('manages').populate('manager').populate('projects').exec();
  }

  async generalSearch(query: string, skip = 0, limit = 10): Promise<Employee[]>{
    let queri = {}
    queri = { $or: [{ firstName: { $regex: '.*' + query + '.*', $options: 'i' } }, 
              { lastName: { $regex: '.*' + query + '.*', $options: 'i' } },
              { positionTitle: { $regex: '.*' + query + '.*', $options: 'i' } },
              { email: { $regex: '.*' + query + '.*', $options: 'i' } },
            ] }

    return await this.employeeModel.find(queri).populate('manages').populate('manager').populate('projects').skip(skip).limit(limit).exec();
  }

}
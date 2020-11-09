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

  async createEmployee(newEmployee: Employee & EmployeeAuth & { employeeId?: number }): Promise<Employee> {

    //await this.waitForMongooseConnection(mongoose);
    const session = await this.employeeModel.db.startSession();
     session.startTransaction();
    try {
      if (!newEmployee._id && newEmployee.employeeId) {
        newEmployee._id = newEmployee.employeeId
      }
      newEmployee.password = await bcrypt.hash(newEmployee.password, 10);

      const createdEmployee = new this.employeeModel(newEmployee);
      const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
      const manager = await this.employeeModel.findById(newEmployee.managerId).populate('manages').populate('projects').session(session).exec();


      if (manager) {
        manager.manages.push(createdEmployee);
        await manager.save();
      }
      
      await this.employeeAuthModel.create([createdEmployeeAuth],{session:session});
      const employee=await this.employeeModel.create([createdEmployee],{session:session});
      

      await session.commitTransaction();
      return employee[0];
    } 
    catch (error) {

      await session.abortTransaction();
     
      if (error.code === 11000) {
        throw new ConflictException("Employee already exists");
      }

      throw new NotFoundException('The employee is not existed');
    } finally {

      session.endSession();
     
    }


  }

  
  async createEmployees(newEmployees: (Employee & EmployeeAuth & { employeeId?: number })[]): Promise<Employee[]> {
    
    const session =await this.employeeModel.db.startSession();

    session.startTransaction();

    try {
      // return await Promise.all(newEmployees.map(async emp => {
      //   return await this.createEmployee(emp)
      // }))
     
      
      const updatedEmployees = await Promise.all(newEmployees.map(
        async (employee) => {
          return { ...employee, _id: (!employee._id && employee.employeeId ? employee.employeeId : employee._id), password: await bcrypt.hash(employee.password, 10) };
          // const createdEmployee = new this.employeeModel(newEmployee);
          // const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
          // await this.employeeAuthModel.create(createdEmployeeAuth)
          // await this.employeeModel.create(createdEmployee);
          // return createdEmployee;
        }));
      await this.employeeAuthModel.create(updatedEmployees,{session:session});
      const savedEmployees = await this.employeeModel.create(updatedEmployees,{session:session});
      const allEmployees = await this.employeeModel.find().populate('manages').populate('projects').session(session).exec();

      // console.log(savedEmployees);
      // console.log(allEmployees);

      await Promise.all(savedEmployees.map(emp1 => {
        if (emp1.managerId) {
          const index = allEmployees.findIndex(emp2 => emp2._id === emp1.managerId);
          allEmployees[index].manages.push(emp1);
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
    return await this.employeeModel.find().populate('projects').populate('manages').exec();
  }

  async getManagersManager(employeeId: number, managerHeight: number, populateDepth: number): Promise<Employee> {
    let employee = await this.employeeModel.findById(employeeId).exec()
    for (let i = 0; i < managerHeight; i++) {
      if (employee.managerId) {
        employee = await this.employeeModel.findById(employee.managerId).exec()
      } else {
        break;
      }
    }
    employee.manages = await this.getManages(employee._id, populateDepth);
    return employee;
  }

  async getManages(managerId: number, depth: number): Promise<Employee[]> {

    let populate = { path: 'projects' };

    for (let i = 0; i < depth; i++) {
      const temp = { path: 'manages projects', populate: populate }
      populate = temp;
    }
    return await this.employeeModel.find({ managerId }).populate(populate).exec();
  }

  // async findEmployee(employee: Partial<Employee>): Promise<Employee> {
  //   return await this.employeeModel.findOne(employee).exec();
  // }

  // returns employee data by id
  async findEmployeeById(employeeId: number): Promise<Employee> {
    return await this.employeeModel.findById(employeeId).populate('manages').populate('projects').exec();
  }


  // updating a reference does not work using this method, do manually using .save();
  // updates a single field of an employee model found
  async updateEmployeeData(employeeId: number, update: any): Promise<Employee | null> {
    // this takes a employeId parameter to find the employee to change, and the employee of type Employee is an object with the
    // modified fields already in place, so the service simply replaces the db entry

    return await this.employeeModel.findByIdAndUpdate(employeeId, update, { new: true }).exec();  // return the updated employee
  }

  // removes a single employee from db if request is valid
  // returns true if successful, false otherwise
  //async deleteEmployee(requester: EmployeeAuth, employee: Employee): Promise<boolean> {
  async deleteEmployee(employeeId: number): Promise<Employee> {
    // check if requester is parent of employeeId TODO
    // if(false){
    //   return false;  // UNIMPLEMENTED
    // } 


    // delete employee from db
    const session= await this.employeeModel.db.startSession();

    session.startTransaction();
    try{
    const employee = await this.employeeModel.findById(employeeId).session(session).exec();
    // const returnDoc = await this.employeeModel.findByIdAndDelete(employeeId).exec();
    if (employee) {
      const manager = await this.employeeModel.findById(employee.managerId).populate('manages').populate('projects').session(session).exec();
      if (manager) {
        manager.manages = manager.manages.filter((emp: Employee) => emp._id !== employee._id);
        await manager.save();
      }
      employee.deleteOne();
      await this.employeeAuthModel.findByIdAndDelete(employeeId).session(session).exec();
    }
   
    await session.commitTransaction();
    return employee;
  }catch(error)
  {
    session.abortTransaction();

    throw new NotFoundException('Employee does not exist or fail to deleted');
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
      return await this.employeeModel.find(query).populate('manages').populate('projects').exec();
  }

}
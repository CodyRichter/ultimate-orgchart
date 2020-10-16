import { ConflictException, Injectable } from "@nestjs/common";
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

  ) {}

  async createEmployee(newEmployee: Employee & EmployeeAuth): Promise<Employee> {
    newEmployee._id = newEmployee.employeeId;
    newEmployee.password = await bcrypt.hash(newEmployee.password,10);

    try
    {
     await this.employeeAuthModel.create(newEmployee)
     return await this.employeeModel.create(newEmployee)
    }catch(error)
    {
        if(error.code===11000)
        {
          throw new ConflictException("Employee already exists");
        }

        throw error;
    }
  }

  async createEmployees(newEmployees: (Employee & EmployeeAuth)[]): Promise<Employee[]> {
    const updatedEmployees = await Promise.all(newEmployees.map( 
      async (employee) => { 
        return {...employee, _id: employee.employeeId, password: await bcrypt.hash(employee.password,10)};
      }));

    try
    {
      await this.employeeAuthModel.insertMany(updatedEmployees);
      return await this.employeeModel.insertMany(updatedEmployees)
    }catch(error)
    {
        if(error.code===11000)
        {
          throw new ConflictException("An Employee in the specified data already exists");
        }

        throw error;
    }
  }

  async findAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeModel.find().exec();
  }

  // returns employee data by id
  async findEmployeeById(employeeId: number): Promise<Employee> {
    return await this.employeeModel.findById(employeeId).exec();
  }

  /*
    NEW PROCESSES
  */

  // updates a single field of an employee model found
  async updateEmployeeData(employeeId: number, update: any): Promise<Employee | null>{
    // this takes a employeId parameter to find the employee to change, and the employee of type Employee is an object with the
    // modified fields already in place, so the service simply replaces the db entry

    return await this.employeeModel.findByIdAndUpdate(employeeId, update, {new: true}).exec();  // return the updated employee
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
    await this.employeeAuthModel.findByIdAndDelete(employeeId).exec();
    const returnDoc = await this.employeeModel.findByIdAndDelete(employeeId).exec();
    return returnDoc;
  }  
}
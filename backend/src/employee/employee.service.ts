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
    newEmployee.password = await bcrypt.hash(newEmployee.password,10);

    const createdEmployee = new this.employeeModel(newEmployee);
    const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);

    try
    {
     await createdEmployeeAuth.save();

     return await createdEmployee.save();
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
        return {...employee, password:  await bcrypt.hash(employee.password,10)};
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
    return await this.employeeModel.findOne({employeeId}).exec();
  }

  /*
    NEW PROCESSES
  */

  // updates a single field of an employee model found
  async updateEmployeeData(employeeId: any, update: any): Promise<Employee | null>{
    // this takes a employeId parameter to find the employee to change, and the employee of type Employee is an object with the
    // modified fields already in place, so the service simply replaces the db entry

    const filter = { id: Number(employeeId) };
    //return await this.employeeModel.findOneAndReplace(filter, employee, {new: true}).exec();
    return await this.employeeModel.findOneAndUpdate(filter, update, {new: true});  // return the updated employee
  }

  // removes a single employee from db if request is valid
  // returns true if successful, false otherwise
  //async deleteEmployee(requester: EmployeeAuth, employee: Employee): Promise<boolean> {
  async deleteEmployee(employee: Employee): Promise<boolean> {
    // check if requester is parent of employeeId TODO
    if(false){
      return false;  
    } 
    // delete employee from db
    const returnDoc = this.employeeModel.findOneAndDelete(employee);
    if(returnDoc){
      //console.log(returnDoc);
      return true;  // return true if there is a return type, which indicates that object is found
    } 

    return false;  // no returnDoc means it wasn't found, and it wasn't deleted - return failed op
  }

  // collects raw db status (w/o confidentials like pswd), creates JSON file
  async getJSON(): Promise<File | null>{
    var employees;
    const fs = require("fs");
    const employees_list = require("./employees_list");
    for(employees in this.findAllEmployees()){
      employees_list.push(this.findAllEmployees()[employees]);
    }
    fs.writeFile("employees-list.json",JSON.stringify(employees_list),(err: any)=>{
      if (err) throw err;
      console.log("Done write")
    });
    return fs;
  }

  
}
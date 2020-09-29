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


  
}
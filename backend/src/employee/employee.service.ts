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

  async createEmployee(newEmployee: Employee): Promise<void> {
    const createdEmployee = new this.employeeModel(newEmployee);
    const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
    
    const hashedPassword=await bcrypt.hash(createdEmployeeAuth.password,10);
    createdEmployeeAuth.password=hashedPassword;
    try
    {
     await createdEmployeeAuth.save();

     await createdEmployee.save();
    }catch(error)
    {
        if(error.code===11000)
        {
          throw new ConflictException("Employee already exists");
        }

        throw error;
    }
  }

  async findAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeModel.find().exec();
  }


  
}
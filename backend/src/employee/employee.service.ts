import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "./employee.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
    @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>

  ) {}

  async createEmployee(newEmployee: Employee): Promise<Employee> {
    const createdEmployee = new this.employeeModel(newEmployee);
    const createdEmployeeAuth = new this.employeeAuthModel(newEmployee);
    createdEmployeeAuth.save();
    return await createdEmployee.save();
  }

  async findAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeModel.find().exec();
  }
}
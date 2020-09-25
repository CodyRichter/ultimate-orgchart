import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('all')
  async getAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeService.findAllEmployees();
  }

  @Post()
  async createEmployee(@Body() newEmployee: Employee): Promise<Employee> {
    return await this.employeeService.createEmployee(newEmployee);
  }
}
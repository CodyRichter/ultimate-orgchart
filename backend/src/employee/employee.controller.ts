import { Controller, Get, Post, Body,UseGuards,Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("employee")
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('all')
  async getAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeService.findAllEmployees();
  }

  @Post()
  async createEmployee(@Body() newEmployee: Employee): Promise<void> {
    return await this.employeeService.createEmployee(newEmployee);
  }

  @Get('profile')
  getProfile(@Request() req)
  {
      return req.user;
  }
}
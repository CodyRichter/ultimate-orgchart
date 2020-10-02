
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body,UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("employee")
@UseGuards(JwtAuthGuard,RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('all')
  @Roles('employee')
  async getAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeService.findAllEmployees();
  }

  @Post('create')
  @Roles('manager')
  async createEmployee(@Body() newEmployee: Employee & EmployeeAuth): Promise<Employee> {
    return await this.employeeService.createEmployee(newEmployee);
  }

  @Post('create/multiple')
  @Roles('manager')
  async createEmployees(@Body() newEmployees: (Employee & EmployeeAuth)[]): Promise<Employee[]> {
    return await this.employeeService.createEmployees(newEmployees);
  }

  @Post('uploadJSON')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage()
}))
  async uploadSingleFileWithPost(@UploadedFile() file): Promise<Employee[]> {
    const data = JSON.parse(file.buffer);
    return await this.employeeService.createEmployees(data);
  }
}
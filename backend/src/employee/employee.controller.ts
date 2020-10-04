import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body,UseGuards, UseInterceptors, UploadedFile, Patch, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as multer from 'multer';

//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("employee")
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Returns all employees
  @Get('all')
  async getAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeService.findAllEmployees();
  }

  // Creates a single employee in the db
  // shouldn't this need requester id to make sure managers don't willy nilly add employees?
  // Guard admin/manager
  @Post('create')
  async createEmployee(@Body() newEmployee: Employee & EmployeeAuth): Promise<Employee> {
    return await this.employeeService.createEmployee(newEmployee);
  }

  // Creates multiple employees in the db - used only by upload JSON function
  // Guard admin
  @Post('create/multiple')
  async createEmployees(@Body() newEmployees: (Employee & EmployeeAuth)[]): Promise<Employee[]> {
    return await this.employeeService.createEmployees(newEmployees);
  }

  // Posts a JSON to the backend to be uploaded into the db
  // Guard admin
  @Post('uploadJSON')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage()
  }))
  async uploadSingleFileWithPost(@UploadedFile() file): Promise<Employee[]> {
    const data = JSON.parse(file.buffer);
    return await this.employeeService.createEmployees(data);
  }

  /*
    NEW ENDPOINTS
  */
  // Returns the information of a single employee
  // No guard
  @Get('info/employee')
  async viewEmployeeData(@Body() id: number): Promise<Employee | null> {  // needs the id of employee to view as 'id'
    return this.employeeService.findEmployeeById(id);
  }

  // Edits a single field of an employee
  // No guard, but requires edit to match requester
  @Patch("info/employee")
  async updateEmployee(@Body() requester: Employee & EmployeeAuth, id: number,
                       field: string, value: string): Promise<Employee | null> {
    return this.employeeService.updateEmployeeData(requester, id, field, value);
  }

  // Deletes a single employee
  @Delete("delete")
  async deleteEmployee(@Body() requester: EmployeeAuth, id: number): Promise<boolean>{
    return await this.employeeService.deleteEmployee(requester, id);
  }

  // returns a single JSON file of the current db status
  @Get("json")
  async getJSON(): Promise<File | null>{
    return await this.employeeService.getJSON();
  }

}
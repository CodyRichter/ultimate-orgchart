import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body,UseGuards, UseInterceptors, UploadedFile, Patch, Delete, Param, Response } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/roles.enum';
//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("employee")
@UseGuards(JwtAuthGuard,RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Returns all employees
  //not need to specify the role 
  //since all types of user have access to it 
  @Get('all')
  async getAllEmployees(): Promise<Employee[] | null> {
    return await this.employeeService.findAllEmployees();
  }

  // Creates a single employee in the db
  // shouldn't this need requester id to make sure managers don't willy nilly add employees?
  // Guard admin/manager
  @Post('create')
  @Roles(Role.ADMIN,Role.MANAGER)
  async createEmployee(@Body() newEmployee: Employee & EmployeeAuth): Promise<Employee> {
    return await this.employeeService.createEmployee(newEmployee);
  }

  // Creates multiple employees in the db - used only by upload JSON function
  // Guard admin
  @Post('create/multiple')
  @Roles(Role.ADMIN,Role.MANAGER)
  async createEmployees(@Body() newEmployees: (Employee & EmployeeAuth)[]): Promise<Employee[]> {
    return await this.employeeService.createEmployees(newEmployees);
  }

  // Posts a JSON to the backend to be uploaded into the db
  // Guard admin
  @Post('uploadJSON')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage()
  }))
  async uploadSingleFileWithPost(@UploadedFile() file): Promise<Employee[]> {
    const data = JSON.parse(file.buffer);
    return await this.employeeService.createEmployees(data);
  }
  
  // returns a single JSON file of the current db status
  @Get("JSON")
  async getJSON(@Response() res): Promise<any>{
    const data = await this.employeeService.findAllEmployees();
    const date = new Date().toUTCString();
    
    res.set({
      'Content-Disposition': `attachment; filename="employee_data_${date}.json"`,
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });
    res.send(data);
    res.end();
  }

  @Get('getChildren/:managerId?')
  async getChildren(@Param('managerId') managerId: number): Promise<Employee[]> {  // needs the id of employee to view as 'id'
    return await this.employeeService.getChildren(managerId);
  }

  // Returns the information of a single employee
  // No guard
  @Get(':employeeId')
  async viewEmployeeData(@Param('employeeId') employeeId: any): Promise<Employee> {  // needs the id of employee to view as 'id'
    return await this.employeeService.findEmployeeById(employeeId);
  }





  /*
    NEW ENDPOINTS
  */

  // Edits a single field of an employee
  // No guard, but requires edit to match requester
  @Patch(":employeeId")
  async updateEmployee(@Param("employeeId") employeeId: any, @Body() update: any): Promise<Employee> {
    // requires frontend to send update in the form { field: value } to work - how to enforce??? TODO
    // takes in an any value for employeeId, but must be able to be casted into a number to work
    return await this.employeeService.updateEmployeeData(employeeId, update);
  }

  // Deletes a single employee
  @Delete(":employeeId")
  @Roles(Role.ADMIN,Role.MANAGER)
  async deleteEmployee(@Param("employeeId") employeeId: any): Promise<Employee>{
    return await this.employeeService.deleteEmployee(employeeId);
  }



}
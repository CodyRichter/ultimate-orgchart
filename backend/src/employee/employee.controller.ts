import { Controller, Get, Post, Body, UploadedFile ,UseInterceptors, Param, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import multer = require('multer');

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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFileWithPost(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body.firstName);
    console.log(body.favoriteColor);
    return file;
  }

  @Get(':filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res){
    return res.sendFile
  }
}
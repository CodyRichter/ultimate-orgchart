
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body,UseGuards,Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, 'josn');
        },
    }),
}))
  uploadSingleFileWithPost(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body.firstName);
    console.log(body.favoriteColor);
    return file;
  }
}
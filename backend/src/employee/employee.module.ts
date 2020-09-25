import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';

@Module({
  imports: [TypegooseModule.forFeature([Employee, EmployeeAuth])],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}

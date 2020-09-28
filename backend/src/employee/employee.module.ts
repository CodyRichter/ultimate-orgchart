import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypegooseModule.forFeature([Employee, EmployeeAuth]),
  MulterModule.register({
    dest: './uploads',
  }),
],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}

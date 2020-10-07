import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { EmployeeAuth } from 'src/auth/auth.model';
import { Employee } from 'src/employee/employee.model';


@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  imports: [
    TypegooseModule.forFeature([Employee, EmployeeAuth]),

  ]
})

export class ManagerModule {}

import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { EmployeeAuth } from 'src/auth/auth.model';
import { Employee } from 'src/employee/employee.model';
import { ManagerRequest } from './manager.model';
import {EmployeeService} from'../employee/employee.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { NotificationDoc } from 'src/notification/notification.model';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService,EmployeeService,JwtStrategy,NotificationService],
  imports: [
    TypegooseModule.forFeature([Employee, EmployeeAuth,ManagerRequest,NotificationDoc]),
  ]
})

export class ManagerModule {}

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Employee } from 'src/employee/employee.model';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {NotificationDoc} from './notification.model';
import { ManagerRequest } from 'src/manager/manager.model';
@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [TypegooseModule.forFeature([NotificationDoc,Employee,ManagerRequest]),],
})
export class NotificationModule {}

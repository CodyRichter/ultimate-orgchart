import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Employee } from 'src/employee/employee.model';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [TypegooseModule.forFeature([Notification,Employee]),],
})
export class NotificationModule {}

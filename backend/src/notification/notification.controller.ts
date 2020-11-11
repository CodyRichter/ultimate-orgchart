import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NotificationDoc } from './notification.model';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }

    //Create notification test endpoint
    @Post('/create')
    async createNotification(@Body() notification: NotificationDoc): Promise<NotificationDoc> {
        return this.notificationService.createNotification(notification);
    }

    //get all notifications from db   could be used by admin
    @Get('/all')
    async getAllNotifications(@Query('dismissed') dismissed:string): Promise<NotificationDoc[]> {
        return await this.notificationService.getAllNotifications(dismissed);
    }

    //get all the notifications of given employee Id
    @Get('employee/:employeeId')
    async getNotifications(@Param('employeeId') employeeId: number,@Query('dismissed') dismissed:string): Promise<NotificationDoc[]> {
        return await this.notificationService.getNotificationsByEmployeeId(employeeId,dismissed);
    }

    //do we need to receive the body? since it is simply change the dimiss field to false
    @Patch('dismiss/:notificationId')
    async updateNotification(@Param('notificationId') notificationId: number): Promise<NotificationDoc> {
        return this.notificationService.dismissNotification(notificationId);
    }

}

import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(private readonly notificationService:NotificationService){}



    //TODO: get all the notifications of given employee Id
    @Get(':EmployeeId')
    async getNotifications(@Param('EmployeeId')employeeId:number):Promise<Notification[]>
    {
            return 
    } 

    //TODO: get all notifications from db   could be used by admin
    @Get('/all')
    async getAllNotifications():Promise<Notification[]>
    {
        return
    }


    //TODO: do we need to receive the body? since it is simply change the dimiss field to false
    //do we need to delete the notification in the db? if employee dismiss the notification
    @Patch(':Id')
    async updateNotification():Promise<Notification>
    {
        return 
    }

}
    
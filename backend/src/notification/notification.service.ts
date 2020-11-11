import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { isNullOrUndefined } from '@typegoose/typegoose/lib/internal/utils';
import { InjectModel } from 'nestjs-typegoose';
import { Employee } from 'src/employee/employee.model';
import { ManagerRequest } from 'src/manager/manager.model';
import { NotificationDoc } from './notification.model';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(NotificationDoc) private readonly notificationModel: ReturnModelType<typeof NotificationDoc>,
        @InjectModel(ManagerRequest) private readonly managerRequestModel: ReturnModelType<typeof ManagerRequest>,
    ) { }



    //create notification document
    async createNotification(notification: NotificationDoc): Promise<NotificationDoc> {
        //check if the employeeId is existed
        if (!notification.hasOwnProperty('employeeId')) {
            throw new NotFoundException('Employee Id is required');
        }
        else {
            let savedNotification = new this.notificationModel({...notification});

            if (notification.hasOwnProperty('managerRequest')) {


                const managerRequest = await this.managerRequestModel.findById((notification.managerRequest as ManagerRequest)._id).populate('employee').populate('fromManager').populate('toManager').exec();
                if (managerRequest === null) {
                    throw new NotFoundException('Manager Request does not exist');
                }
                savedNotification = new this.notificationModel({...notification, managerRequest: managerRequest });
            }
            await savedNotification.save();
            return savedNotification;
        }
    }


    //update notification document
    async dismissNotification(notificationId:number):Promise<NotificationDoc>{
        
        //find the notification from db
        const notification=await this.notificationModel.findById(notificationId).populate('managerRequest').exec();
        if(notification===null)
        {
            throw new NotFoundException('The notification does not exist!');
        }
        notification.dismissed=true;
        await notification.save();    
        return notification;
    }


    //get all notifications
    //mainly for admin 
    async getAllNotifications(dismissed:string):Promise<NotificationDoc[]>
    {
        if(dismissed&&dismissed==='false')
        {
        return await this.notificationModel.find({dismissed:false}).populate('managerRequest').exec();
        }
        else return await this.notificationModel.find().populate('managerRequest').exec();
    }

    //get all notifications by employeeId
    async getNotificationsByEmployeeId(employeeId:number,dismissed:string):Promise<NotificationDoc[]>
    {
        //if dissmissed is true means we need to return  dismissed=false notifications
        if(dismissed&&dismissed==='false')
        {
        return await this.notificationModel.find({employeeId:employeeId,dismissed:false}).populate('managerRequest').exec();
        }
        else return await this.notificationModel.find({employeeId:employeeId}).populate('managerRequest').exec();
    }
}


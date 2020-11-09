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
            if (notification.hasOwnProperty('managerRequest')) 
            {


                const managerRequest = await this.managerRequestModel.findById((notification.managerRequest as ManagerRequest)._id).populate('employee').populate('fromManager').populate('toManager').exec();
                if (managerRequest === null) {
                    throw new NotFoundException('Manager Request does not exist');
                }

                const savedNotification = new this.notificationModel({ employeeId: notification.employeeId, title: notification.title, description: notification.description, managerRequest: managerRequest });

                //save to database
                await savedNotification.save();
                return savedNotification;
            }
            else {
                const savedNotification = new this.notificationModel({ employeeId: notification.employeeId, title: notification.title, description: notification.description });
                await savedNotification.save();
                return savedNotification;
            }
        }     
    }

    //
}

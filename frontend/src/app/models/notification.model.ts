import { ManagerRequest } from './manager.model';

export class NotificationModel {
    _id?:number;
    employeeId:number;
    title:string;
    description:string;
    dismissed:boolean;
    managerRequest: ManagerRequest | number;
}

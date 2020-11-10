import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { plugin } from "@typegoose/typegoose";
import { ManagerRequest } from "src/manager/manager.model";



@plugin(AutoIncrementID,{})
export class NotificationDoc extends TimeStamps{
    @prop()
    _id:number;

    @prop({require:true})
    employeeId:number;

    @prop({require:true})
    title:string;

    @prop({require:true})
    description:string;

    @prop({required:false,default:false})
    dismissed:boolean;

    @prop({required:false,ref:ManagerRequest})
    managerRequest: Ref<ManagerRequest>;

    

    


}
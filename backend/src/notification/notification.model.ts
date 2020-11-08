import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { plugin } from "@typegoose/typegoose";
import { ManagerRequest } from "src/manager/manager.model";



@plugin(AutoIncrementID,{})
export class Notification extends TimeStamps{
    @prop()
    _id:number;

    @prop({require:true})
    title:string;

    @prop({require:true})
    description:string;

    @prop({ref:ManagerRequest})
    managerRequest: Ref<ManagerRequest>;

    @prop()
    dismiss:boolean;

    @prop({require:true})
    employeeId:number;


}
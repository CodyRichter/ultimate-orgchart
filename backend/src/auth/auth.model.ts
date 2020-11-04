import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class EmployeeAuth  extends TimeStamps {
    @prop()
    _id: number;
    
    @prop({ required: true,index:true,unique:true,  })
    email: string;

    @prop({ required: true,  })
    password: string;
}
import { prop } from "@typegoose/typegoose";

export class EmployeeAuth {
    @prop({ required: true, index: true, unique: true, })
    _id: number;
    
    @prop({ required: true, index: true, unique: true, })
    employeeId: number;

    
    @prop({ required: true,index:true,unique:true,  })
    email: string;

    @prop({ required: true,  })
    password: string;
}
import { prop } from "@typegoose/typegoose";

export class EmployeeAuth {
    @prop()
    _id: number;
    
    @prop({ required: true,index:true,unique:true,  })
    email: string;

    @prop({ required: true,  })
    password: string;
}
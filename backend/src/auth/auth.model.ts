import { DocumentType, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions : {
        toJSON: {
            transform: (doc: DocumentType<EmployeeAuth>, ret) => {
                delete ret.__v;
                delete ret._id;
            }
        }
    }
})
export class EmployeeAuth {

    
    @prop({ required: true, index: true, unique: true, })
    employeeId: number;

    
    @prop({ required: true,index:true,unique:true,  })
    email: string;

    @prop({ required: true,  })
    password: string;
}
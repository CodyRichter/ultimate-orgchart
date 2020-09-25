import { DocumentType, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions : {
        toJSON: {
            transform: (doc: DocumentType<EmployeeAuth>, ret) => {
                delete ret.__v;
                ret.databaseId = ret._id;
                delete ret._id;
            }
        }
    }
})
export class EmployeeAuth {

    @prop({ required: true, index: true, })
    employeeId: number;

    @prop({ required: true,  })
    email: string;

    @prop({ required: true,  })
    password: string;
}
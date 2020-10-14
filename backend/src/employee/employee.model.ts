import { prop, Ref } from "@typegoose/typegoose";

export class Employee {
    @prop({ required: true, index: true, unique: true, })
    _id: number;

    @prop({ required: true, index: true, unique: true, })
    employeeId: number;

    @prop({ required: true,  })
    firstName: string;

    @prop({ required: true,  })
    lastName: string;

    @prop({ required: true,  })
    companyId: number;

    @prop({ required: true,  })
    positionTitle: string;

    @prop({ required: true,  })
    companyName: string;

    @prop({ required: true, default: false })
    isManager: boolean;

    @prop({ required: true, default: false })
    isAdmin: boolean;

    @prop({ required: false,  })
    managerId?: number;

    @prop({ required: true, index:true,unique:true })
    email: string;

    @prop({ required: true,  })
    startDate: Date;

    @prop({ ref: Employee })
    children?: Ref<Employee>[];
}
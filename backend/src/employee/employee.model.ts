import { plugin, prop, Ref } from "@typegoose/typegoose";
// import * as deeppopulate from 'mongoose-deep-populate';
import { AutoIncrementID } from "@typegoose/auto-increment";
import { ProjectsEmployee } from "src/project/projectsEmployee.model";

// @plugin(AutoIncrementID, {})

export class Employee {
    @prop()
    _id: number;

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

    @prop({ required: true, index:true, unique:true })
    email: string;

    @prop({ required: true,  })
    startDate: Date;


    @prop({ ref: Employee })
    manages: Ref<Employee>[];

    @prop({ref:"ProjectsEmployee"})
    projects: Ref<ProjectsEmployee>[]
    
    // @prop({ required: true })
    // managesProject: Ref<ProjectsEmployee>[];
}

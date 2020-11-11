
import { AutoIncrementID } from "@typegoose/auto-increment";
import { Ref, plugin, prop } from "@typegoose/typegoose";
import { Employee } from '../employee/employee.model';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ProjectsEmployee } from "./projectsEmployee.model";

//project schema
@plugin(AutoIncrementID, {startAt:1})
export class Project extends TimeStamps{
    @prop()
    _id: number;

    //project name
    @prop()
    name: string;

    
    @prop()
    description: string;


    //
    @prop({require: true,ref:"ProjectsEmployee", type: Number})
    manager: Ref<ProjectsEmployee, number>;

    @prop({required: true,ref:"ProjectsEmployee", type: Number})
    employees: Ref<ProjectsEmployee, number>[];
}

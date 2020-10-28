import { AutoIncrementID } from "@typegoose/auto-increment";
import { Ref, plugin, prop } from "@typegoose/typegoose";
import { Employee } from '../employee/employee.model';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Project } from "./project.model";

//projectsEmployee table
@plugin(AutoIncrementID, {startAt:1})
export class ProjectsEmployee extends TimeStamps{
    @prop()
    _id:number;

    @prop({required: true,ref:"Employee"})
    employee: Ref<Employee>

    @prop({required: true,ref:"Project"})
    project: Ref<Project>

    @prop({required: true})
    role: string
}
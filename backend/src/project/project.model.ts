
import { AutoIncrementID } from "@typegoose/auto-increment";
import { Ref, plugin, prop } from "@typegoose/typegoose";
import { Employee } from '../employee/employee.model';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ProjectsEmployee } from "./projectsEmployee.model";

//project schema
@plugin(AutoIncrementID, {})
export class Project extends TimeStamps{
    @prop()
    _id: number;

    //project name
    @prop()
    name: string

    
    @prop()
    description: string


    //
    @prop({require: true,ref:"ProjectsEmployee"})
    manager: Ref<ProjectsEmployee>;

    @prop({required: false,ref:"ProjectsEmployee"})
    employees: Ref<ProjectsEmployee>[]
}


// //projectsEmployee table
// //@plugin(AutoIncrementID, {})
// export class ProjectsEmployee extends TimeStamps{
//     @prop()
//     __id: number;

//     @prop({required: true})
//     employee: Ref<Employee>

//     @prop({required: true})
//     project: Ref<Project>

//     @prop({required: true})
//     role: string
// }
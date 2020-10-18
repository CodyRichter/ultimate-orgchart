
import { AutoIncrementID } from "@typegoose/auto-increment";
import { Ref, plugin, prop } from "@typegoose/typegoose";
import { Employee } from '../employee/employee.model';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

//project schema
@plugin(AutoIncrementID, {})
export class Project extends TimeStamps{
    @prop({required: true, unique: true})
    _id: number;

    @prop()
    name: string

    @prop()
    description: string


    @prop({require: true})
    manager: Ref<projectsEmployee>;

    @prop({required: true})
    employeeList: Ref<projectsEmployee>[]

}


//projectsEmployee table
@plugin(AutoIncrementID, {})
export class projectsEmployee extends TimeStamps{
    @prop({required: true, unique: true})
    __id: number;

    @prop({required: true})
    employee: Ref<Employee>

    @prop({required: true})
    project: Ref<Project>

    @prop({required: true})
    role: string
}
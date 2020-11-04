import { AutoIncrementID } from "@typegoose/auto-increment";
import { plugin, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Employee } from "../employee/employee.model";
import { RequestStatus } from "../../../enums/request.enum";

//extends the TimeStamps class which contain createdAt and updatedAt two fields
@plugin(AutoIncrementID, {})
export class ManagerRequest extends TimeStamps {
        @prop()
        _id: number;

        @prop({ require: true, autopopulate: true, ref: Employee })
        employee: Ref<Employee>;

        @prop({ require: true, autopopulate: true, ref: Employee })
        fromManager: Ref<Employee>;

        @prop({ require: true, autopopulate: true, ref: Employee })
        toManager: Ref<Employee>;

        @prop({ required: true })
        previousPosition: string;

        @prop({ required: true })
        newPosition: string;
        //I think we don't need to enforce client send the status
        //we can set it when the request created in the service
        @prop({ required: false, default: RequestStatus.Pending })
        status?: RequestStatus;

}

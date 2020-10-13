import { AutoIncrementID } from "@typegoose/auto-increment";
import { plugin, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

//extends the TimeStamps class which contain createdAt and updatedAt two fields
@plugin(AutoIncrementID, {})
export class ManagerRequest extends TimeStamps {
        @prop()
        _id: number;

        @prop({ required: true })
        employeeId: number;

        @prop({ required: true })
        fromManagerId: number;

        @prop({ required: true })
        toManagerId: number;

        //previous title

        //new title

        //I think we don't need to enforce client send the status
        //we can set it when the request created in the service
        @prop({ required: false })
        status: string;

}
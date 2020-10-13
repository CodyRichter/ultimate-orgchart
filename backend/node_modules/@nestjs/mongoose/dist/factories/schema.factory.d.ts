import { Type } from '@nestjs/common';
import * as mongoose from 'mongoose';
export declare class SchemaFactory {
    static createForClass(target: Type<unknown>): mongoose.Schema<any>;
}

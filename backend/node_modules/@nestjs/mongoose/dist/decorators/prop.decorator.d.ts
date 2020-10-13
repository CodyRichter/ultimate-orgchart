import * as mongoose from 'mongoose';
export declare type PropOptions = mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType;
export declare function Prop(options?: PropOptions): PropertyDecorator;

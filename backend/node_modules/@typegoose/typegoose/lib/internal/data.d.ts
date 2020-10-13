import type { Model, SchemaDefinition } from 'mongoose';
import type { IGlobalOptions } from '../types';
/** Schema Map */
export declare const schemas: Map<string, SchemaDefinition>;
/** Models Map */
export declare const models: Map<string, Model<any>>;
/** Constructors Map */
export declare const constructors: Map<string, NewableFunction>;
/** Global Options */
export declare const globalOptions: IGlobalOptions;

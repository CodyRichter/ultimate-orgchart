import * as mongoose from 'mongoose';
import type { AnyParamConstructor } from '../types';
/**
 * Private schema builder out of class props
 * -> If you discover this, don't use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param sch Already Existing Schema?
 * @param opt Options to override
 * @param isFinalSchema If it's the final schema to be built (defaults to `true`).
 * @returns Returns the Build Schema
 * @private
 */
export declare function _buildSchema<U extends AnyParamConstructor<any>>(cl: U, sch?: mongoose.Schema, opt?: mongoose.SchemaOptions, isFinalSchema?: boolean): mongoose.Schema<any>;

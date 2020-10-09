import type { IModelOptions } from './types';
/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```
 * @modelOptions({ schemaOptions: { timestamps: true } })
 * class Name {}
 *
 * // Note: The default Class "TimeStamps" can be used for type information and options already set
 * ```
 */
export declare function modelOptions(options: IModelOptions): ClassDecorator;
export { modelOptions as ModelOptions };

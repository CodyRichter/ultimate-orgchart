import { WhatIsIt } from './internal/constants';
import type { ArrayPropOptions, BasePropOptions, MapPropOptions, PropOptionsForNumber, PropOptionsForString, VirtualOptions } from './types';
/**
 * Set Property Options for the property below
 * @param options Options
 * @param kind Overwrite auto-inferred kind
 * @example
 * ```ts
 * class ClassName {
 *   @prop()
 *   public someProp?: string;
 *
 *   @prop({ type: [String] })
 *   public someArrayProp: string[];
 *
 *   @prop({ type: String })
 *   public someMapProp: Map<string, string>;
 * }
 * ```
 */
declare function prop(options?: BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions, kind?: WhatIsIt): PropertyDecorator;
/**
 * Set Property(that are Maps) Options for the property below
 * @param options Options for the Map
 *
 * @deprecated use "prop"
 */
declare function mapProp(options: MapPropOptions): PropertyDecorator;
/**
 * Set Property(that are Arrays) Options for the property below
 * @param options Options
 *
 * @deprecated use "prop"
 */
declare function arrayProp(options: ArrayPropOptions): PropertyDecorator;
export { prop, arrayProp, mapProp };
export { prop as Prop, arrayProp as ArrayProp, mapProp as MapProp };

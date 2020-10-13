"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapProp = exports.ArrayProp = exports.Prop = exports.mapProp = exports.arrayProp = exports.prop = void 0;
const constants_1 = require("./internal/constants");
const utils = require("./internal/utils");
const logSettings_1 = require("./logSettings");
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
function prop(options, kind) {
    return (target, key) => {
        options = options !== null && options !== void 0 ? options : {};
        const existingMapForTarget = Reflect.getOwnMetadata(constants_1.DecoratorKeys.PropCache, target);
        if (utils.isNullOrUndefined(existingMapForTarget)) {
            Reflect.defineMetadata(constants_1.DecoratorKeys.PropCache, new Map(), target);
        }
        const mapForTarget = existingMapForTarget !== null && existingMapForTarget !== void 0 ? existingMapForTarget : Reflect.getOwnMetadata(constants_1.DecoratorKeys.PropCache, target);
        mapForTarget.set(key, { options, target, key, whatis: kind });
        logSettings_1.logger.debug('Added "%s.%s" to the Decorator Cache', utils.getName(target.constructor), key);
    };
}
exports.prop = prop;
exports.Prop = prop;
/**
 * Set Property(that are Maps) Options for the property below
 * @param options Options for the Map
 *
 * @deprecated use "prop"
 */
function mapProp(options) {
    /* istanbul ignore next */
    return utils.deprecate(prop.call(null, options, constants_1.WhatIsIt.MAP), '"@mapProp" is deprecated, use "@prop" instead', 'TDEP0002');
}
exports.mapProp = mapProp;
exports.MapProp = mapProp;
/**
 * Set Property(that are Arrays) Options for the property below
 * @param options Options
 *
 * @deprecated use "prop"
 */
function arrayProp(options) {
    /* istanbul ignore next */
    return utils.deprecate(prop.call(null, options, constants_1.WhatIsIt.ARRAY), '"@arrayProp" is deprecated, use "@prop" instead', 'TDEP0001');
}
exports.arrayProp = arrayProp;
exports.ArrayProp = arrayProp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQUErRDtBQUMvRCwwQ0FBMEM7QUFDMUMsK0NBQXVDO0FBWXZDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsSUFBSSxDQUNYLE9BQTRILEVBQzVILElBQWU7SUFFZixPQUFPLENBQUMsTUFBVyxFQUFFLEdBQW9CLEVBQUUsRUFBRTtRQUMzQyxPQUFPLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksRUFBRSxDQUFDO1FBRXhCLE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyx5QkFBYSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQWlDLENBQUM7UUFDckgsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUNqRCxPQUFPLENBQUMsY0FBYyxDQUFDLHlCQUFhLENBQUMsU0FBUyxFQUFFLElBQUksR0FBRyxFQUFxQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZHO1FBQ0QsTUFBTSxZQUFZLEdBQUcsb0JBQW9CLGFBQXBCLG9CQUFvQixjQUFwQixvQkFBb0IsR0FBSyxPQUFPLENBQUMsY0FBYyxDQUFDLHlCQUFhLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBa0MsQ0FBQztRQUV2SSxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTlELG9CQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9GLENBQUMsQ0FBQztBQUNKLENBQUM7QUF3QlEsb0JBQUk7QUFHSSxvQkFBSTtBQXpCckI7Ozs7O0dBS0c7QUFDSCxTQUFTLE9BQU8sQ0FBQyxPQUF1QjtJQUN0QywwQkFBMEI7SUFDMUIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxvQkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLCtDQUErQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlILENBQUM7QUFheUIsMEJBQU87QUFHeUIsMEJBQU87QUFkakU7Ozs7O0dBS0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxPQUF5QjtJQUMxQywwQkFBMEI7SUFDMUIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxvQkFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLGlEQUFpRCxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2xJLENBQUM7QUFFYyw4QkFBUztBQUdZLDhCQUFTIn0=
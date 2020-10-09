"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMethod = exports.queryMethod = void 0;
const constants_1 = require("./internal/constants");
const utils_1 = require("./internal/utils");
const logSettings_1 = require("./logSettings");
/**
 * Adds a query method to schema.
 *
 * @param func Query function
 * @example
 * ```ts
 * interface FindHelpers {
 *   findByTitle: QueryMethod<typeof findByTitle>;
 * }
 *
 * function findByTitle(this: ReturnModelType<typeof Event, FindHelpers>, title: string) {
 *  return this.find({ title });
 * }
 *
 * @queryMethod(findByTitle)
 * class Event {
 *  @prop()
 *  public title: string;
 * }
 *
 * const EventModel = getModelForClass<typeof Event, FindHelpers>(Event);
 * ```
 */
function queryMethod(func) {
    return (target) => {
        var _a;
        logSettings_1.logger.info('Adding query method "%s" to %s', func.name, utils_1.getName(target));
        const queryMethods = new Map((_a = Reflect.getMetadata(constants_1.DecoratorKeys.QueryMethod, target)) !== null && _a !== void 0 ? _a : []);
        queryMethods.set(func.name, func);
        Reflect.defineMetadata(constants_1.DecoratorKeys.QueryMethod, queryMethods, target);
    };
}
exports.queryMethod = queryMethod;
exports.QueryMethod = queryMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlNZXRob2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcXVlcnlNZXRob2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esb0RBQXFEO0FBQ3JELDRDQUEyQztBQUMzQywrQ0FBdUM7QUFHdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFnQixXQUFXLENBQ3pCLElBQTJGO0lBRTNGLE9BQU8sQ0FBQyxNQUFXLEVBQUUsRUFBRTs7UUFDckIsb0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLFlBQVksR0FBbUIsSUFBSSxHQUFHLE9BQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyx5QkFBYSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDLENBQUM7UUFDM0csWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxjQUFjLENBQUMseUJBQWEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCxrQ0FTQztBQUd1QixrQ0FBVyJ9
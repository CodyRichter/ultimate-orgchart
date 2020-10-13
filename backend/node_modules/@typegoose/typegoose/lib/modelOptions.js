"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelOptions = exports.modelOptions = void 0;
const constants_1 = require("./internal/constants");
const utils_1 = require("./internal/utils");
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
function modelOptions(options) {
    return (target) => {
        utils_1.assignGlobalModelOptions(target);
        utils_1.assignMetadata(constants_1.DecoratorKeys.ModelOptions, options, target);
    };
}
exports.modelOptions = modelOptions;
exports.ModelOptions = modelOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZGVsT3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBcUQ7QUFDckQsNENBQTRFO0FBRzVFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFnQixZQUFZLENBQUMsT0FBc0I7SUFDakQsT0FBTyxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQ3JCLGdDQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLHNCQUFjLENBQUMseUJBQWEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQztBQUNKLENBQUM7QUFMRCxvQ0FLQztBQUd3QixvQ0FBWSJ9
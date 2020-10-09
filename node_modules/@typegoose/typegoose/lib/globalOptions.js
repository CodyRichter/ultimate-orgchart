"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseENV = exports.setGlobalOptions = void 0;
const constants_1 = require("./internal/constants");
const data_1 = require("./internal/data");
const utils_1 = require("./internal/utils");
const logSettings_1 = require("./logSettings");
/**
 * Set Typegoose's global Options
 */
function setGlobalOptions(options) {
    utils_1.assertion(typeof options === 'object', new TypeError('"options" argument needs to be an object!'));
    logSettings_1.logger.info('"setGlobalOptions" got called with', options);
    for (const key of Object.keys(options)) {
        data_1.globalOptions[key] = Object.assign({}, data_1.globalOptions[key], options[key]);
    }
    logSettings_1.logger.info('new Global Options:', options);
}
exports.setGlobalOptions = setGlobalOptions;
/**
 * Parse Typegoose Environment Variables and apply them
 */
function parseENV() {
    var _a;
    logSettings_1.logger.info('"parseENV" got called');
    const options = {
        globalOptions: {},
        options: {
            allowMixed: process.env.TG_ALLOW_MIXED && process.env.TG_ALLOW_MIXED in constants_1.Severity
                ? mapValueToSeverity(process.env.TG_ALLOW_MIXED)
                : (_a = data_1.globalOptions.options) === null || _a === void 0 ? void 0 : _a.allowMixed
        }
    };
    setGlobalOptions(options);
}
exports.parseENV = parseENV;
/**
 * Maps strings to the number
 * -> This function is specifically build for "Severity"-Enum
 * @throws {Error} if not in range of the "Severity"-Enum
 * @example
 * ```ts
 * mapValueToSeverity("WARN") === 1
 * mapValueToSeverity("1") === 1
 * // now internal use
 * mapValueToSeverity(1) === 1
 * ```
 * @param value The value to check for
 */
function mapValueToSeverity(value) {
    utils_1.assertion(value in constants_1.Severity, new Error(`"value" is not in range of "Severity"! (got: ${value})`));
    if (typeof value === 'number') {
        return value;
    }
    return mapValueToSeverity(constants_1.Severity[value]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9nbG9iYWxPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQUFnRDtBQUNoRCwwQ0FBZ0Q7QUFDaEQsNENBQTZDO0FBQzdDLCtDQUF1QztBQUd2Qzs7R0FFRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLE9BQXVCO0lBQ3RELGlCQUFTLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLElBQUksU0FBUyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBQztJQUVuRyxvQkFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUUzRCxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdEMsb0JBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxvQkFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsb0JBQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQVZELDRDQVVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixRQUFROztJQUN0QixvQkFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sT0FBTyxHQUFtQjtRQUM5QixhQUFhLEVBQUUsRUFBRTtRQUNqQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksb0JBQVE7Z0JBQ2xFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztnQkFDaEQsQ0FBQyxPQUFDLG9CQUFhLENBQUMsT0FBTywwQ0FBRSxVQUFVO1NBQ3hDO0tBQ0YsQ0FBQztJQUVGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFkRCw0QkFjQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILFNBQVMsa0JBQWtCLENBQUMsS0FBc0I7SUFDaEQsaUJBQVMsQ0FBQyxLQUFLLElBQUksb0JBQVEsRUFBRSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLGtCQUFrQixDQUFDLG9CQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDIn0=
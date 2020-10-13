"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoValidClass = exports.NotAllVPOPElementsError = exports.NotStringTypeError = exports.NotNumberTypeError = exports.InvalidTypeError = void 0;
const utils_1 = require("./utils");
class InvalidTypeError extends Error {
    constructor(targetName, key, Type) {
        super(`"${targetName}.${key}"'s Type is invalid! Type is: "${Type}" [E009]`);
    }
}
exports.InvalidTypeError = InvalidTypeError;
class NotNumberTypeError extends Error {
    constructor(targetName, key, enumKey, enumValue) {
        super(`Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]\n`
            + `  Encountered with property: ${enumKey}.${typeof enumValue}`);
    }
}
exports.NotNumberTypeError = NotNumberTypeError;
class NotStringTypeError extends Error {
    constructor(targetName, key, enumKey, enumValue) {
        super(`Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]\n`
            + `  Encountered with property in Enum: ${enumKey}.${typeof enumValue}`);
    }
}
exports.NotStringTypeError = NotStringTypeError;
/** Not All Virtual Populate Elements Error */
class NotAllVPOPElementsError extends Error {
    constructor(name, key) {
        super(`"${name}.${key}" has not all needed Virtual Populate Options! Needed are: ${utils_1.allVirtualoptions.join(', ')} [E006]`);
    }
}
exports.NotAllVPOPElementsError = NotAllVPOPElementsError;
class NoValidClass extends TypeError {
    constructor(cl) {
        super(`"${cl}" is not a function(/constructor)!`);
    }
}
exports.NoValidClass = NoValidClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVybmFsL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBNEM7QUFFNUMsTUFBYSxnQkFBaUIsU0FBUSxLQUFLO0lBQ3pDLFlBQVksVUFBa0IsRUFBRSxHQUFXLEVBQUUsSUFBYTtRQUN4RCxLQUFLLENBQUMsSUFBSSxVQUFVLElBQUksR0FBRyxrQ0FBa0MsSUFBSSxVQUFVLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQ0Y7QUFKRCw0Q0FJQztBQUVELE1BQWEsa0JBQW1CLFNBQVEsS0FBSztJQUMzQyxZQUFZLFVBQWtCLEVBQUUsR0FBVyxFQUFFLE9BQWUsRUFBRSxTQUFpQjtRQUM3RSxLQUFLLENBQ0gsV0FBVyxVQUFVLElBQUksR0FBRyxxRkFBcUY7Y0FDL0csZ0NBQWdDLE9BQU8sSUFBSSxPQUFPLFNBQVMsRUFBRSxDQUNoRSxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBUEQsZ0RBT0M7QUFFRCxNQUFhLGtCQUFtQixTQUFRLEtBQUs7SUFDM0MsWUFBWSxVQUFrQixFQUFFLEdBQVcsRUFBRSxPQUFlLEVBQUUsU0FBaUI7UUFDN0UsS0FBSyxDQUNILFdBQVcsVUFBVSxJQUFJLEdBQUcsd0RBQXdEO2NBQ2xGLHdDQUF3QyxPQUFPLElBQUksT0FBTyxTQUFTLEVBQUUsQ0FDeEUsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQVBELGdEQU9DO0FBRUQsOENBQThDO0FBQzlDLE1BQWEsdUJBQXdCLFNBQVEsS0FBSztJQUNoRCxZQUFZLElBQVksRUFBRSxHQUFXO1FBQ25DLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLDhEQUE4RCx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVILENBQUM7Q0FDRjtBQUpELDBEQUlDO0FBRUQsTUFBYSxZQUFhLFNBQVEsU0FBUztJQUN6QyxZQUFZLEVBQU87UUFDakIsS0FBSyxDQUFDLElBQUksRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQUpELG9DQUlDIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevels = exports.setLogLevel = exports.logger = void 0;
const log = require("loglevel");
exports.logger = log;
exports.setLogLevel = log.setLevel;
exports.LogLevels = log.levels;
log.setDefaultLevel(exports.LogLevels.WARN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbG9nU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQWdDO0FBQ2hCLHFCQUFNO0FBRVQsUUFBQSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUMzQixRQUFBLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3BDLEdBQUcsQ0FBQyxlQUFlLENBQUMsaUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9
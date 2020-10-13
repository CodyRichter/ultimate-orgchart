"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_constants_1 = require("../mongoose.constants");
function raw(definition) {
    Object.defineProperty(definition, mongoose_constants_1.RAW_OBJECT_DEFINITION, {
        value: true,
        enumerable: false,
        configurable: false,
    });
    return definition;
}
exports.raw = raw;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const mongoose = require("mongoose");
const type_metadata_storage_1 = require("../storages/type-metadata.storage");
const BUILT_IN_TYPES = [Boolean, Number, String, Map, Date];
class DefinitionsFactory {
    static createForClass(target) {
        var _a;
        if (!target) {
            throw new Error(`Target class "${target}" passed in to the "DefinitionsFactory#createForClass()" method is "undefined".`);
        }
        let schemaDefinition = {};
        let parent = target;
        while (!shared_utils_1.isUndefined(parent.prototype)) {
            if (parent === Function.prototype) {
                break;
            }
            const schemaMetadata = type_metadata_storage_1.TypeMetadataStorage.getSchemaMetadataByTarget(parent);
            if (!schemaMetadata) {
                parent = Object.getPrototypeOf(parent);
                continue;
            }
            (_a = schemaMetadata.properties) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const options = this.inspectTypeDefinition(item.options);
                schemaDefinition = Object.assign({ [item.propertyKey]: options }, schemaDefinition);
            });
            parent = Object.getPrototypeOf(parent);
        }
        return schemaDefinition;
    }
    static inspectTypeDefinition(options) {
        if (typeof options === 'function') {
            if (this.isPrimitive(options)) {
                return options;
            }
            else if (this.isMongooseSchemaType(options)) {
                return options;
            }
            return this.createForClass(options);
        }
        else if (typeof options.type === 'function') {
            options.type = this.inspectTypeDefinition(options.type);
            return options;
        }
        else if (Array.isArray(options)) {
            return options.length > 0
                ? [this.inspectTypeDefinition(options[0])]
                : options;
        }
        return options;
    }
    static isPrimitive(type) {
        return BUILT_IN_TYPES.includes(type);
    }
    static isMongooseSchemaType(type) {
        if (!type || !type.prototype) {
            return false;
        }
        const prototype = Object.getPrototypeOf(type.prototype);
        return prototype && prototype.constructor === mongoose.SchemaType;
    }
}
exports.DefinitionsFactory = DefinitionsFactory;

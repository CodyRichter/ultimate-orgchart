"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._buildSchema = void 0;
const mongoose = require("mongoose");
const logSettings_1 = require("../logSettings");
const typegoose_1 = require("../typegoose");
const constants_1 = require("./constants");
const data_1 = require("./data");
const processProp_1 = require("./processProp");
const utils_1 = require("./utils");
/**
 * Private schema builder out of class props
 * -> If you discover this, don't use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param sch Already Existing Schema?
 * @param opt Options to override
 * @param isFinalSchema If it's the final schema to be built (defaults to `true`).
 * @returns Returns the Build Schema
 * @private
 */
function _buildSchema(cl, sch, opt, isFinalSchema = true) {
    var _a, _b;
    utils_1.assertionIsClass(cl);
    utils_1.assignGlobalModelOptions(cl); // to ensure global options are applied to the current class
    // Options sanity check
    opt = utils_1.mergeSchemaOptions(utils_1.isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt, cl);
    const name = utils_1.getName(cl);
    logSettings_1.logger.debug('_buildSchema Called for %s with options:', name, opt);
    /** Simplify the usage */
    const Schema = mongoose.Schema;
    const ropt = (_a = Reflect.getMetadata(constants_1.DecoratorKeys.ModelOptions, cl)) !== null && _a !== void 0 ? _a : {};
    const schemaOptions = Object.assign({}, (_b = ropt === null || ropt === void 0 ? void 0 : ropt.schemaOptions) !== null && _b !== void 0 ? _b : {}, opt);
    const decorators = Reflect.getMetadata(constants_1.DecoratorKeys.PropCache, cl.prototype);
    if (!utils_1.isNullOrUndefined(decorators)) {
        for (const decorator of decorators.values()) {
            processProp_1.processProp(decorator);
        }
    }
    if (!data_1.schemas.has(name)) {
        data_1.schemas.set(name, {});
    }
    if (!(sch instanceof Schema)) {
        sch = new Schema(data_1.schemas.get(name), schemaOptions);
    }
    else {
        sch = sch.clone();
        sch.add(data_1.schemas.get(name));
    }
    sch.loadClass(cl);
    if (isFinalSchema) {
        /** Get Metadata for Nested Discriminators */
        const disMap = Reflect.getMetadata(constants_1.DecoratorKeys.NestedDiscriminators, cl);
        if (disMap instanceof Map) {
            for (const [key, discriminators] of disMap) {
                logSettings_1.logger.debug('Applying Nested Discriminators for:', key, discriminators);
                const path = sch.path(key);
                utils_1.assertion(!utils_1.isNullOrUndefined(path), new Error(`Path "${key}" does not exist on Schema of "${name}"`));
                utils_1.assertion(typeof path.discriminator === 'function', new Error(`There is no function called "discriminator" on schema-path "${key}" on Schema of "${name}"`));
                for (const { type: child, value: childName } of discriminators) {
                    const childSch = utils_1.getName(child) === name ? sch : typegoose_1.buildSchema(child);
                    const discriminatorKey = childSch.get('discriminatorKey');
                    if (childSch.path(discriminatorKey)) {
                        childSch.paths[discriminatorKey].options.$skipDiscriminatorCheck = true;
                    }
                    path.discriminator(utils_1.getName(child), childSch, childName);
                }
            }
        }
        // Hooks
        {
            /** Get Metadata for PreHooks */
            const preHooks = Reflect.getMetadata(constants_1.DecoratorKeys.HooksPre, cl);
            if (Array.isArray(preHooks)) {
                preHooks.forEach((obj) => sch.pre(obj.method, obj.func));
            }
            /** Get Metadata for PreHooks */
            const postHooks = Reflect.getMetadata(constants_1.DecoratorKeys.HooksPost, cl);
            if (Array.isArray(postHooks)) {
                postHooks.forEach((obj) => sch.post(obj.method, obj.func));
            }
        }
        /** Get Metadata for Virtual Populates */
        const virtuals = Reflect.getMetadata(constants_1.DecoratorKeys.VirtualPopulate, cl);
        if (virtuals instanceof Map) {
            for (const [key, options] of virtuals) {
                logSettings_1.logger.debug('Applying Virtual Populates:', key, options);
                sch.virtual(key, options);
            }
        }
        /** Get Metadata for indices */
        const indices = Reflect.getMetadata(constants_1.DecoratorKeys.Index, cl);
        if (Array.isArray(indices)) {
            for (const index of indices) {
                logSettings_1.logger.debug('Applying Index:', index);
                sch.index(index.fields, index.options);
            }
        }
        /** Get Metadata for Query Methods */
        const queryMethods = Reflect.getMetadata(constants_1.DecoratorKeys.QueryMethod, cl);
        if (queryMethods instanceof Map) {
            for (const [funcName, func] of queryMethods) {
                logSettings_1.logger.debug('Applying Query Method:', funcName, func);
                sch.query[funcName] = func;
            }
        }
        /** Get Metadata for indices */
        const plugins = Reflect.getMetadata(constants_1.DecoratorKeys.Plugins, cl);
        if (Array.isArray(plugins)) {
            for (const plugin of plugins) {
                logSettings_1.logger.debug('Applying Plugin:', plugin);
                sch.plugin(plugin.mongoosePlugin, plugin.options);
            }
        }
        // this method is to get the typegoose name of the model/class if it is user-handled (like buildSchema, then manually mongoose.model)
        sch.method('typegooseName', () => {
            return name;
        });
    }
    // add the class to the constructors map
    data_1.constructors.set(name, cl);
    return sch;
}
exports._buildSchema = _buildSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVybmFsL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFFckMsZ0RBQXdDO0FBQ3hDLDRDQUEyQztBQWEzQywyQ0FBNEM7QUFDNUMsaUNBQStDO0FBQy9DLCtDQUE0QztBQUM1QyxtQ0FBZ0k7QUFFaEk7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBZ0IsWUFBWSxDQUMxQixFQUFLLEVBQ0wsR0FBcUIsRUFDckIsR0FBNEIsRUFDNUIsZ0JBQXlCLElBQUk7O0lBRTdCLHdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXJCLGdDQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsNERBQTREO0lBRTFGLHVCQUF1QjtJQUN2QixHQUFHLEdBQUcsMEJBQWtCLENBQUMseUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUzRixNQUFNLElBQUksR0FBRyxlQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFekIsb0JBQU0sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXBFLHlCQUF5QjtJQUN6QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sSUFBSSxTQUFrQixPQUFPLENBQUMsV0FBVyxDQUFDLHlCQUFhLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDdEYsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGFBQWEsbUNBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXhFLE1B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
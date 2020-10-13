"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Severity = exports.WhatIsIt = exports.DecoratorKeys = void 0;
/**
 * Collection of Reflect Types for easy maintenance
 */
var DecoratorKeys;
(function (DecoratorKeys) {
    /** Get the Typescript assigned Type at runtime */
    DecoratorKeys["Type"] = "design:type";
    /**
     * "@prop" Cache
     * -> Use only for a class
     */
    DecoratorKeys["PropCache"] = "typegoose:properties";
    /**
     * Storage location for Model Options
     * -> Use only for a class
     */
    DecoratorKeys["ModelOptions"] = "typegoose:options";
    /**
     * Storage location for Indexes
     * -> Use only for a class
     */
    DecoratorKeys["Index"] = "typegoose:indexes";
    /**
     * Storage location for Plugins
     * -> Use only for a class
     */
    DecoratorKeys["Plugins"] = "typegoose:plugins";
    /**
     * Storage location for Pre-Hooks
     * -> Use only for a class
     */
    DecoratorKeys["HooksPre"] = "typegoose:hooksPre";
    /**
     * Storage location for Post-Hooks
     * -> Use only for a class
     */
    DecoratorKeys["HooksPost"] = "typegoose:hooksPost";
    /**
     * Storage location for Virtual Populates
     * -> Use only for a class
     */
    DecoratorKeys["VirtualPopulate"] = "typegoose:virtualPopulate";
    /**
     * Storage location for Query Methods
     * -> Use only for a class
     */
    DecoratorKeys["QueryMethod"] = "typegoose:queryMethod";
    /**
     * Storage location for Nested Discriminators
     * -> Use only for a class
     */
    DecoratorKeys["NestedDiscriminators"] = "typegoose:nestedDiscriminators";
})(DecoratorKeys = exports.DecoratorKeys || (exports.DecoratorKeys = {}));
/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
var WhatIsIt;
(function (WhatIsIt) {
    WhatIsIt[WhatIsIt["ARRAY"] = 0] = "ARRAY";
    WhatIsIt[WhatIsIt["MAP"] = 1] = "MAP";
    WhatIsIt[WhatIsIt["NONE"] = 2] = "NONE";
})(WhatIsIt = exports.WhatIsIt || (exports.WhatIsIt = {}));
/** Severity levels for soft-warnings */
var Severity;
(function (Severity) {
    Severity[Severity["ALLOW"] = 0] = "ALLOW";
    Severity[Severity["WARN"] = 1] = "WARN";
    Severity[Severity["ERROR"] = 2] = "ERROR";
})(Severity = exports.Severity || (exports.Severity = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVybmFsL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILElBQVksYUFnRFg7QUFoREQsV0FBWSxhQUFhO0lBQ3ZCLGtEQUFrRDtJQUNsRCxxQ0FBb0IsQ0FBQTtJQUNwQjs7O09BR0c7SUFDSCxtREFBa0MsQ0FBQTtJQUNsQzs7O09BR0c7SUFDSCxtREFBa0MsQ0FBQTtJQUNsQzs7O09BR0c7SUFDSCw0Q0FBMkIsQ0FBQTtJQUMzQjs7O09BR0c7SUFDSCw4Q0FBNkIsQ0FBQTtJQUM3Qjs7O09BR0c7SUFDSCxnREFBK0IsQ0FBQTtJQUMvQjs7O09BR0c7SUFDSCxrREFBaUMsQ0FBQTtJQUNqQzs7O09BR0c7SUFDSCw4REFBNkMsQ0FBQTtJQUM3Qzs7O09BR0c7SUFDSCxzREFBcUMsQ0FBQTtJQUNyQzs7O09BR0c7SUFDSCx3RUFBdUQsQ0FBQTtBQUN6RCxDQUFDLEVBaERXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBZ0R4QjtBQUVELG1IQUFtSDtBQUNuSCxJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFDbEIseUNBQUssQ0FBQTtJQUNMLHFDQUFHLENBQUE7SUFDSCx1Q0FBSSxDQUFBO0FBQ04sQ0FBQyxFQUpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBSW5CO0FBRUQsd0NBQXdDO0FBQ3hDLElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNsQix5Q0FBSyxDQUFBO0lBQ0wsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7QUFDUCxDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkIifQ==
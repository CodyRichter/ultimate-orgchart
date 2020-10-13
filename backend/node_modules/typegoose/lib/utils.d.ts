import * as mongoose from 'mongoose';
export declare function isPrimitive(Type: any): boolean;
export declare function isObject(Type: any): boolean;
export declare function isNumber(Type: any): boolean;
export declare function isString(Type: any): boolean;
export declare function initAsObject(name: any, key: any): void;
export declare function initAsArray(name: any, key: any): void;
export declare function getClassForDocument(document: mongoose.Document): any;

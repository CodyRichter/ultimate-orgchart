export declare class InvalidTypeError extends Error {
    constructor(targetName: string, key: string, Type: unknown);
}
export declare class NotNumberTypeError extends Error {
    constructor(targetName: string, key: string, enumKey: string, enumValue: string);
}
export declare class NotStringTypeError extends Error {
    constructor(targetName: string, key: string, enumKey: string, enumValue: string);
}
/** Not All Virtual Populate Elements Error */
export declare class NotAllVPOPElementsError extends Error {
    constructor(name: string, key: string);
}
export declare class NoValidClass extends TypeError {
    constructor(cl: any);
}

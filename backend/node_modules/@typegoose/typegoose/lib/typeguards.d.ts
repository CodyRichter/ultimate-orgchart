import * as mongoose from 'mongoose';
import type { DocumentType, Ref, RefType } from './types';
/**
 * Check if the given document is already populated
 * @param doc The Ref with uncertain type
 */
export declare function isDocument<T, S extends RefType>(doc: Ref<T, S>): doc is DocumentType<NonNullable<T>>;
/**
 * Check if the given array is already populated
 * @param docs The Array of Refs with uncertain type
 */
export declare function isDocumentArray<T, S extends RefType>(docs: mongoose.Types.Array<Ref<T, S>> | undefined): docs is mongoose.Types.Array<DocumentType<NonNullable<T>>>;
export declare function isDocumentArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined): docs is DocumentType<NonNullable<T>>[];
/**
 * Check if the document is not undefined/null and is not an document
 * @param doc The Ref with uncretain type
 */
export declare function isRefType<T, S extends RefType>(doc: Ref<T, S> | undefined): doc is NonNullable<S>;
/**
 * Check if the document is not undefined/null and is not an document
 * @param docs The Ref with uncretain type
 */
export declare function isRefTypeArray<T, S extends RefType>(docs: mongoose.Types.Array<Ref<T, S>> | undefined): docs is mongoose.Types.Array<NonNullable<S>>;
export declare function isRefTypeArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined): docs is NonNullable<S>[];
/**
 * Check if the input is a mongoose.Model
 * @param model The Value to check
 */
export declare function isModel(model: any): model is mongoose.Model<any>;

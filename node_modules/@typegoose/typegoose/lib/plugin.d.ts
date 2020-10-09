import type { Func } from './types';
/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export declare function plugin<TFunc extends Func, TParams = Parameters<TFunc>[1]>(mongoosePlugin: TFunc, options?: TParams): ClassDecorator;
export { plugin as Plugins };

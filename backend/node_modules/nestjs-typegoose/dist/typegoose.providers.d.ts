import { FactoryProvider } from '@nestjs/common/interfaces';
import { TypegooseClass, TypegooseClassWithOptions, TypegooseDiscriminator } from './typegoose-class.interface';
export declare function createTypegooseProviders(connectionName: string, models?: TypegooseClassWithOptions[]): FactoryProvider[];
declare type ClassOrDiscriminator = TypegooseClassWithOptions | TypegooseDiscriminator;
declare type TypegooseInput = TypegooseClass | ClassOrDiscriminator;
export declare function convertToTypegooseClassWithOptions(item: TypegooseInput): TypegooseClassWithOptions;
export {};

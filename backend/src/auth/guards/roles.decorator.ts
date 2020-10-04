import {SetMetadata} from '@nestjs/common';

//customized own decorator
//set the datameta
export const Roles=(...roles:string[]) =>SetMetadata('roles',roles);
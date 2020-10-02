import {SetMetadata} from '@nestjs/common';

//customized own decorator
export const Roles=(...roles:string[]) =>SetMetadata('roles',roles);
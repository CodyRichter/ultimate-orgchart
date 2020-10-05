import {SetMetadata} from '@nestjs/common';
import { Role } from 'src/enums/roles.enum';

//customized own decorator
//set the datameta
export const Roles=(...roles: Role[]) =>SetMetadata('roles', roles);
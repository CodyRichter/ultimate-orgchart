import {Injectable, UnauthorizedException} from '@nestjs/common';

import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { EmployeeAuth } from '../auth.model';

import {AuthService} from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){ super(
        {
            usernameField:'email',
            passwordField:'password',
        }
    );};


async validate(email:string,password:string):Promise<EmployeeAuth>
{
    const employeeAuth= await this.authService.validateEmployee(email,password);

    if(!employeeAuth)
    {
        
        throw new UnauthorizedException('Invalid credentials');
    }

    return employeeAuth;

}

}
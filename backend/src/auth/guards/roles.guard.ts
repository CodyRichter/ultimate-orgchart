import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from'@nestjs/core';
import { urlencoded } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) 
    {
      return false;
    }
    //this request is coming from jwtGuard which is what jwt return to us
    const request = context.switchToHttp().getRequest();
    //we get the instance of that request.user
    const user = request.user;
    
    let userRole:string=null;

    if(user.isAdmin===true)
    {
      //admin should able to access to all the endpoint 
        return true;
    }

    else if(user.isManager===true)
    {
      //manager should able to access to employee endpoint
        if(roles[0]='employee')
        {
          return true;
        }
        userRole='manager';
    }

    else
    {
        userRole='employee';
    }

    if(roles[0]!==userRole)
    {
        throw new UnauthorizedException();
    }

    return true;
  }


  
}
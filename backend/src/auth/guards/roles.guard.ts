import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import {Reflector} from'@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    
    //if not role specified in the decorator
    //all the role can access
    if (!roles) 
    {
      return true;
    }
    //this request is coming from jwtGuard which is what jwt return to us
    const request = context.switchToHttp().getRequest();
    //we get the instance of that request.user
    const user = request.user;
    

    if(roles.includes(0)&&user.isAdmin){ return true;}

    if(roles.includes(1)&&user.isManager){return true;}

    //not those types of role above, return false
    else {return false;}
    
  }


  
}
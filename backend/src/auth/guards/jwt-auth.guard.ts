import {ConflictException, Injectable} from '@nestjs/common';
import {TokenExpiredError} from 'jsonwebtoken';
import {AuthGuard} from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    // handleRequest(err,user,info:Error)
    // {
    //     if(info instanceof TokenExpiredError)
    //     {
    //         throw new ConflictException('The token expired');
    //     }
    //     return user;
    // }
    
}
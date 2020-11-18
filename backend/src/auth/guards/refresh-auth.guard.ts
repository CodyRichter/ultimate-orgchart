import {ConflictException, Injectable} from '@nestjs/common';
import {TokenExpiredError} from 'jsonwebtoken';
import {AuthGuard} from '@nestjs/passport';


@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh_token'){

    // handleRequest(err,user,info:Error)
    // {
    //     if(info instanceof TokenExpiredError)
    //     {
    //         throw new ConflictException('The token expired');
    //     }
    //     return user;
    // }
    
}
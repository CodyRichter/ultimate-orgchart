import { Body, Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { EmployeeAuth } from './auth.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
@Controller('auth')
export class AuthController 
{
    constructor(private authService:AuthService){}
   

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req)
    {

            //Caution: the request will store the info in User object
            //I was using req.employeeAuth to retrieve the data! 
            return this.authService.signIn(req.user);
    }


    //protected route
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req)
    {
        return req.user;
    }

}



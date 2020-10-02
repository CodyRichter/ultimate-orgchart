import { Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
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

    //RoleGuard must be placed after JwtAuthGuard
    //Otherwise RoleGuard will not receive the request from jwt
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('profile')
    @Roles('admin')
    async getUser(@Request() req)
    {
            return req.user;
    }
}



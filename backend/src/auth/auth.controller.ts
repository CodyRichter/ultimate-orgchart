import { Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
@Controller('auth')
export class AuthController 
{
    constructor(private authService:AuthService, private employeeService: EmployeeService){}


    @Post('createAdmin') 
    async createAdminAccount() {
        return await this.employeeService.createEmployee({
                isManager: true, 
                isAdmin: true, 
                firstName: "Admin",
                lastName: "Developer", 
                companyId: 1,
                positionTitle: "Software Engineer",
                companyName: "404 Brain Not Found",
                _id: 404123456789404,
                employeeId: 404123456789404,
                managerId: null,
                email: "admin@admin.com", 
                password: "password", 
                startDate: new Date(),
        });
    }
   
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req)
    {

            //Caution: the request will store the info in User object
            //I was using req.employeeAuth to retrieve the data! 
            return this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUser(@Request() req)
    {
            return req.user;
    }
}



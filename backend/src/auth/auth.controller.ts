import { Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { Employee } from 'src/employee/employee.model';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeAuth } from './auth.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {User} from './guards/user.decorator';
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
                managerId: null,
                manages: [],
                email: "admin@admin.com", 
                password: "password", 
                startDate: new Date(),
                projects:[],
        });
    }
    
    // Local strategy @user will be employee auth
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@User() user:EmployeeAuth)
    {   
            return this.authService.signIn(user);
    }
 
    // JWT strategy @user will be employee details
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUser(@User() user:Employee)
    {
            return user;
    }
}



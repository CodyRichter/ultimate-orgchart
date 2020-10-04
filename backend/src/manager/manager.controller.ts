import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body,UseGuards, UseInterceptors, UploadedFile, Patch, Delete } from '@nestjs/common';
import { Employee } from '../employee/employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { Manager } from './manager.model';  // doesn't exist??
import { ManagerService } from './manager.service';

@Controller('manager')
// TODO: setup JWT auth guard???
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Post('transfer')
    async transfer(@Body() requester: Employee & EmployeeAuth, manager: Employee, 
                    employee: Employee): Promise<Employee> {
        return await this.managerService.transfer(requester, manager, employee);
    }

}

import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Patch, Delete } from '@nestjs/common';
import { Employee } from '../employee/employee.model';
import { EmployeeAuth } from '../auth/auth.model';
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { ManagerRequest } from './manager.model';
import { ManagerService } from './manager.service';
@Controller('manager')
// TODO: setup JWT auth guard???
export class ManagerController {
        constructor(private readonly managerService: ManagerService) { }

        // @Post('transfer')
        // async transfer(@Body() requester: Employee & EmployeeAuth, manager: Employee, 
        //                 employee: Employee): Promise<Employee> {
        //     return await this.managerService.transfer(requester, manager, employee);
        // }


        //create the single request
        //if you want to test in the postman make sure use pre-scripting the set the createdDate as DateType
        //Param: manager request
        //Return: the created request
        @Post('create')
        async createRequest(@Body() newRequest: ManagerRequest): Promise<ManagerRequest> {
                return await this.managerService.createRequest(newRequest);
        }


        //approve the request
        //Param: the manager request
        //Return: the updated Employee Schema
        @Patch('approve')
        async approveRequest(@Body() request: ManagerRequest): Promise<Employee> {

                return await this.managerService.approveRequest(request.requestId);
        }

        //reject the request
        //Param: the manager request
        //Return: the updated Request Schema
        @Patch('reject')
        async rejectRequest(@Body() request: ManagerRequest): Promise<ManagerRequest> {

                return await this.managerService.rejectedRequest(request.requestId);
        }

}

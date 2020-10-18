import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Patch, Delete, Param } from '@nestjs/common';
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
        @Patch('approve/:requestId')
        async approveRequest(@Param('requestId') _id: number): Promise<ManagerRequest> {

                return await this.managerService.approveRequest(_id);
        }

        //reject the request
        //Param: the manager request
        //Return: the updated Request Schema
        @Patch('reject/:requestId')
        async rejectRequest(@Param('requestId') _id: number): Promise<ManagerRequest> {
                return await this.managerService.rejectedRequest(_id);
        }


        //get all request from the  fromManagerId field
        //Param: the FromManager Id
        //Return: the lists of request that he has
        @Get("all/from/:managerId")
        async getAllRequestFrom(@Param('managerId') managerId: number) {
                return await this.managerService.findAllRequestsFrom(managerId);
        }

        //get all request  by the toManagerId field
        //Param: the toManagerId
        //Return: the list of request  that given manager Id 
        @Get("all/to/:managerId")
        async getAllRequestTo(@Param('managerId') managerId: number) {
                return await this.managerService.findAllRequestsTo(managerId);
        }

        //left: get request by employeeId 


        //get all request in the database
        //could be used for testing purpose
        @Get('All')
        async getAllRequest() {
                return await this.managerService.findAllRequest();
        }

        //get single request 
        //Param: the request id
        //return: the single request
        @Get("/:requestId")
        async getOneRequest(@Param('_id') requestId: number) {
                return await this.managerService.findRequestById(requestId);
        }

}

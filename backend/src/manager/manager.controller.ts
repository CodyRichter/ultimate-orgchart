import { Controller, Get, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { Employee } from '../employee/employee.model';
import { ManagerRequest } from './manager.model';
import { ManagerService } from './manager.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import {Role} from '../enums/roles.enum';
import { User } from 'src/auth/guards/user.decorator';
@Controller('managerRequest')
@UseGuards(JwtAuthGuard,RolesGuard)
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
        @Roles(Role.ADMIN,Role.MANAGER)
        async createRequest(@Body() newRequest: ManagerRequest, @User() user:Employee): Promise<ManagerRequest> {
                return await this.managerService.createRequest(newRequest, user);
        }


        //approve the request
        //Param: the manager request
        //Return: the updated Employee Schema
        @Patch('approve/:requestId')
        async approveRequest(@Param('requestId') _id: number, @User() user:Employee): Promise<ManagerRequest> {

                return await this.managerService.approveRequest(_id, user);
        }

        //reject the request
        //Param: the manager request
        //Return: the updated Request Schema
        @Patch('reject/:requestId')
        @Roles(Role.ADMIN,Role.MANAGER)
        async rejectRequest(@Param('requestId') _id: number, @User() user:Employee): Promise<ManagerRequest> {
                return await this.managerService.rejectedRequest(_id, user);
        }

        @Patch('cancel/:requestId')
        @Roles(Role.ADMIN,Role.MANAGER)
        async cancelRequest(@Param('requestId') _id: number, @User() user:Employee): Promise<ManagerRequest> {
                return await this.managerService.cancelRequest(_id, user);
        }


        //get all request from the  fromManagerId field
        //Param: the FromManager Id
        //Return: the lists of request that he has
        @Get("all/from/:managerId")
        @Roles(Role.ADMIN,Role.MANAGER)
        async getAllRequestFrom(@Param('managerId') managerId: number) {
                return await this.managerService.findAllRequestsFrom(managerId);
        }

        //get all request  by the toManagerId field
        //Param: the toManagerId
        //Return: the list of request  that given manager Id 
        @Get("all/to/:managerId")
        @Roles(Role.ADMIN,Role.MANAGER)
        async getAllRequestTo(@Param('managerId') managerId: number) {
                return await this.managerService.findAllRequestsTo(managerId);
        }



        //get all request in the database
        //could be used for testing purpose
        @Get('All')
        @Roles(Role.ADMIN,Role.MANAGER)
        async getAllRequest() {
                return await this.managerService.findAllRequest();
        }

        //get single request 
        //Param: the request id
        //return: the single request
        @Get("/:requestId")
        async getOneRequest(@Param('requestId') requestId: number) {
                return await this.managerService.findRequestById(requestId);
        }

        //left: get request by employeeId 
        @Get('employee/:employeeId')
        async getRequestsByEmployeeId(@Param('employeeId')employeeId:number) {
                return await this.managerService.getRequestByEmployeeId(employeeId);
        }

}

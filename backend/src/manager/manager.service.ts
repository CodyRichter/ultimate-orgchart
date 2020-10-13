import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";
import { ManagerRequest } from './manager.model';
import { RequestStatus } from '../enums/request.enum';
import { EmployeeService } from '../employee/employee.service';
import {Document} from 'mongoose';
@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>,
        @InjectModel(ManagerRequest) private readonly managerRequestModel: ReturnModelType<typeof ManagerRequest>,
        private readonly employeeService: EmployeeService,
    ) {}

    // moves one employee to another in the db
    // async transfer(requester: Employee & EmployeeAuth, manager: Employee, 
    //                 employee: Employee): Promise<Employee> {

    //     return null;
    // }


    //jimmy:10/09
    //create request 
    async createRequest(newRequest: ManagerRequest): Promise<ManagerRequest> {
        
        const createdRequest = new this.managerRequestModel(newRequest);
        //we manually add the status rather than the front-end to
        // specifed the status
        createdRequest.status = RequestStatus.Pending;

        //save to database
        try {
            return await this.managerRequestModel.create(createdRequest);
        } catch (error) {
           
            throw new HttpException
                (
                    {
                        status: HttpStatus.CONFLICT,
                        error: "The request existed",
                    }, HttpStatus.CONFLICT);
        }

    }


    //Jimmy:10/10
    //approve request
    //front-end should sent the request in the body 
    //then we update the 'status' and 'updatedTime' and 'the managerId' that should be updated too.
    //also update the employee info where their managerId should be updated
    async approveRequest(requestId: number): Promise<Employee | null> {

        //find this request first
        //I set some error check in the findRequestById which help us catch the error
        const pendingRequest = await this.findRequestById(requestId);

        //if the status is not pending, means that this request has been processed
        //we throw exception
        //if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };


        //set the status to approved
        pendingRequest.status = RequestStatus.Approved;
        

        //update to the database
        this.updateRequest(pendingRequest._id, pendingRequest);

        //update employee's managerId
        //convert the id to the object,  otherwise it won't be able to pass to the second argument of updateEmployeeData
        const managerId = { managerId: pendingRequest.toManagerId };
        return await this.employeeService.updateEmployeeData(pendingRequest.employeeId, managerId);




    }

    //Jimmy:10/10
    //Reject the request
    //return the updatedRequest
    async rejectedRequest(requestId: number): Promise<ManagerRequest> {
        const pendingRequest = await this.findRequestById(requestId);

        //if the status is not pending, means that this request has been processed
        //we throw exception
        //if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };

        //set the status to rejected
        pendingRequest.status = RequestStatus.Rejcted;
        

        //update to the database
        return await this.updateRequest(pendingRequest._id, pendingRequest);


    }

    //jimmy:10/11
    //find all the requests under the given manager ID in the fromManagerId field 
    async findAllRequestsFrom(fromManagerId: number): Promise<ManagerRequest[] | null> {
        let result: ManagerRequest[];
        try {
            result = await this.managerRequestModel.find({ fromManagerId }).exec();
        } catch (error) {
            throw new NotFoundException('The request does not exist');
        }
        return result;

    }

    //jimmy:10/11
    //find all the requests undert the given manager Id  in the  toManagerId Field
    async findAllRequestsTo(toManagerId: number): Promise<ManagerRequest[] | null> {
        let result: ManagerRequest[];
        try {
            result = await this.managerRequestModel.find({ toManagerId }).exec();
        } catch (error) {
            throw new NotFoundException('The request does not exist');
        }
        return result;

    }

    //jimmy:10/11
    //find all requests in the database
    async findAllRequest(): Promise<ManagerRequest[] | null> {
        return await this.managerRequestModel.find().exec();
    }



    //Jimmy:10/10
    //find the request by requestId
    //return the entire request
    async findRequestById(_id: number): Promise<ManagerRequest> {

        let result: ManagerRequest;
        try {
            result = await this.managerRequestModel.findOne({ _id }).exec();
        } catch (error) {
            throw new NotFoundException('This request does not exist');
        }

        if (!result) {
            throw new NotFoundException('This request does not exist');
        }

        return result;

    }


    //Jimmy:10/10
    //updates a single field of an managerRequest model found
    //if we want to use this function make sure we cal the findRequestById
    //to check the existence of the request
    async updateRequest(requestId: number, update: any): Promise<ManagerRequest | null> {
        // this takes a requestId parameter to find the request to change, and the request of type ManagerRequest is an object with the
        // modified fields already in place, so the service simply replaces the db entry

        const filter = { _id: requestId };
        let result: ManagerRequest;
        try {
            result = await this.managerRequestModel.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false }).exec();

        } catch (error) {

            throw new NotFoundException('the request does not exist');
        }


        return result;

    }

}

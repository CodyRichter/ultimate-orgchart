import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { ManagerRequest } from './manager.model';
import { RequestStatus } from '../enums/request.enum';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
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
    async createRequest(newRequest: ManagerRequest & {fromManagerId?: number, toManagerId?: number, employeeId?: number}): Promise<ManagerRequest> {
        
        const createdRequest = new this.managerRequestModel(newRequest);
        //we manually add the status rather than the front-end to
        // specifed the status
        createdRequest.status = RequestStatus.Pending;
        createdRequest.fromManager = await this.employeeModel.findById(newRequest.fromManagerId ? newRequest.fromManagerId : newRequest.fromManager).exec();
        createdRequest.toManager = await this.employeeModel.findById(newRequest.toManagerId ? newRequest.toManagerId : newRequest.toManager).exec();
        createdRequest.employee = await this.employeeModel.findById(newRequest.employeeId ? newRequest.employeeId : newRequest.employee).exec();
        console.log(createdRequest);
        //save to database
        try {
            return await this.managerRequestModel.create(createdRequest);
        } catch (error) {
           console.log(error);
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
    async approveRequest(requestId: number): Promise<ManagerRequest> {

        //find this request first
        //I set some error check in the findRequestById which help us catch the error
        const pendingRequest = await this.managerRequestModel.findById(requestId).populate('fromManager').populate('toManager').populate('employee').exec();

        //if the status is not pending, means that this request has been processed
        //we throw exception
        if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };

        //set the status to approved
        pendingRequest.status = RequestStatus.Approved;
        
        //update to the database
        await pendingRequest.save();
        // const updatedRequest = this.updateRequest(pendingRequest._id, pendingRequest);

        //update employee's managerId
        //convert the id to the object,  otherwise it won't be able to pass to the second argument of updateEmployeeData
        const employee = await this.employeeModel.findById(pendingRequest.employee).populate('children').exec();
        const fromManager = await this.employeeModel.findById(pendingRequest.fromManager).populate('children').exec();
        const toManager = await this.employeeModel.findById(pendingRequest.toManager).populate('children').exec();

        employee.managerId = toManager._id;
        toManager.children.push(employee);
        fromManager.children = fromManager.children.filter((emp: Employee) => emp._id !== employee._id)

        await fromManager.save();
        await toManager.save()
        await employee.save();
        return pendingRequest;
    }

    //Jimmy:10/10
    //Reject the request
    //return the updatedRequest
    async rejectedRequest(requestId: number): Promise<ManagerRequest> {
        const pendingRequest = await this.managerRequestModel.findById(requestId).populate('fromManager').populate('toManager').populate('employee').exec();

        //if the status is not pending, means that this request has been processed
        //we throw exception
        if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };

        //set the status to rejected
        pendingRequest.status = RequestStatus.Rejcted;

        //update to the database
        await pendingRequest.save()
        return pendingRequest;
    }

    //jimmy:10/11
    //find all the requests under the given manager ID in the fromManagerId field 
    async findAllRequestsFrom(fromManagerId: number): Promise<ManagerRequest[]> {
        let result: ManagerRequest[];
        try {
            result = await this.managerRequestModel.find({ fromManager: fromManagerId }).populate('fromManager').populate('toManager').populate('employee').exec();
        } catch (error) {
            throw new NotFoundException('The request does not exist');
        }
        return result;
    }

    //jimmy:10/11
    //find all the requests undert the given manager Id in the toManagerId Field
    async findAllRequestsTo(toManagerId: number): Promise<ManagerRequest[]> {
        let result: ManagerRequest[];
        try {
            result = await this.managerRequestModel.find({ toManager: toManagerId }).populate('fromManager').populate('toManager').populate('employee').exec();
        } catch (error) {
            throw new NotFoundException('The request does not exist');
        }
        return result;
    }

    //jimmy:10/11
    //find all requests in the database
    async findAllRequest(): Promise<ManagerRequest[]> {
        return await this.managerRequestModel.find().populate('fromManager').populate('toManager').populate('employee').exec();
    }


    //Jimmy:10/10
    //find the request by requestId
    //return the entire request
    async findRequestById(requestId: number): Promise<ManagerRequest> {
        let result: DocumentType<ManagerRequest>;
        try {
            result = await this.managerRequestModel.findById( requestId ).populate('fromManager').populate('toManager').populate('employee').exec();
        } catch (error) {
            throw new NotFoundException('This request does not exist');
        }

        if (!result) {
            throw new NotFoundException('This request does not exist');
        }
        return result
    }


    //Jimmy:10/10
    //updates a single field of an managerRequest model found
    //if we want to use this function make sure we cal the findRequestById
    //to check the existence of the request
    async updateRequest(requestId: number, update: ManagerRequest): Promise<ManagerRequest> {
        // this takes a requestId parameter to find the request to change, and the request of type ManagerRequest is an object with the
        // modified fields already in place, so the service simply replaces the db entry
        try {
            return await this.managerRequestModel.findByIdAndUpdate(requestId, update, { new: true, useFindAndModify: false }).exec();
        } catch (error) {
            console.log(error);
            throw new NotFoundException('the request does not exist');
        }
    }
}

import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { ManagerRequest } from './manager.model';
import { RequestStatus } from '../enums/request.enum';
import { EmployeeService } from '../employee/employee.service';
import { NotificationService } from "src/notification/notification.service";
import { NotificationDoc } from "src/notification/notification.model";

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(ManagerRequest) private readonly managerRequestModel: ReturnModelType<typeof ManagerRequest>,
        @InjectModel(NotificationDoc) private readonly notificationModel: ReturnModelType<typeof NotificationDoc>,
        private readonly employeeService: EmployeeService,
        private readonly notificationService: NotificationService,
    ) { }



    //create request 
    async createRequest(newRequest: ManagerRequest, user: Employee): Promise<ManagerRequest> {

        const session = await this.managerRequestModel.db.startSession();

        session.startTransaction();

        try {
            const createdRequest = new this.managerRequestModel(newRequest);
            // //we manually add the status rather than the front-end to
            // // specifed the status
            const employee = await this.employeeModel.findById(newRequest.employee).session(session).exec();
            const fromManager = await this.employeeModel.findById(newRequest.fromManager).session(session).exec();
            const toManager = await this.employeeModel.findById(newRequest.toManager).session(session).exec();
            const foundEmployee = user.manages.find((emp: Employee) => emp._id === employee._id);
            if (!user.isAdmin && (!foundEmployee || fromManager._id !== user._id)) {
                throw new UnauthorizedException('User is not authorized to move this employee');
            }

            if (fromManager._id === toManager._id) {
                createdRequest.status = RequestStatus.Approved;
                employee.positionTitle = createdRequest.newPosition;
                employee.save();
            } else {
                createdRequest.status = RequestStatus.Pending;
            }
            createdRequest.fromManager = fromManager;
            createdRequest.toManager = toManager;
            createdRequest.employee = employee;

            //save to database
            const savedRequests = await this.managerRequestModel.create([createdRequest], { session: session });
            const savedRequest = savedRequests[0];
            
     
            const notifications: NotificationDoc[] = []
            let requester = `${user.firstName} ${user.lastName}`
            if (user._id !== fromManager.id) {
                requester += ` (on behalf of ${fromManager.firstName} ${fromManager.lastName})`
            }

            if (createdRequest.status === RequestStatus.Approved) {
                const description = `${employee.firstName} ${employee.lastName}'s position was changed from ${savedRequest.previousPosition} to ${savedRequest.newPosition} by ` + requester
                notifications.push(new this.notificationModel({ employeeId: employee._id, title: 'Employee Position Change', description:description}));
                notifications.push(new this.notificationModel({ employeeId: fromManager._id, title: 'Employee Position Change', description:description}));
                if (user._id !== fromManager.id) {
                    notifications.push(new this.notificationModel({ employeeId: user._id, title: 'Employee Position Change', description:description}));
                }
            } else {
                let description = requester + ` is requesting to transfer ${employee.firstName} ${employee.lastName} to ${toManager.firstName} ${toManager.lastName}`;
                if (savedRequest.previousPosition !== savedRequest.newPosition) {
                    description += ` with a position change of ${savedRequest.previousPosition} to ${savedRequest.newPosition}`
                }
                notifications.push(new this.notificationModel({ employeeId: employee._id, title: 'Manager Transfer Request', description:description, managerRequest:savedRequest}));
                notifications.push(new this.notificationModel({ employeeId: fromManager._id, title: 'Manager Transfer Request', description:description, managerRequest:savedRequest}));
                notifications.push(new this.notificationModel({ employeeId: toManager._id, title: 'Manager Transfer Request', description:description, managerRequest:savedRequest}));
                if (user._id !== fromManager.id) {
                    notifications.push(new this.notificationModel({ employeeId: toManager._id, title: 'Manager Transfer Request', description:description, managerRequest:savedRequest}));
                }
            }
    
            await this.notificationModel.create(notifications, {session:session});

            await session.commitTransaction();
            return savedRequest;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }

    //approve request
    //front-end should sent the request in the body 
    //then we update the 'status' and 'updatedTime' and 'the managerId' that should be updated too.
    //also update the employee info where their managerId should be updated

    async approveRequest(requestId: number, user: Employee): Promise<ManagerRequest> {

        const session = await this.managerRequestModel.db.startSession();

        session.startTransaction();

        try {
            //find this request first
            //I set some error check in the findRequestById which help us catch the error
            const pendingRequest = await this.managerRequestModel.findById(requestId).session(session).exec();

            if (user._id !== pendingRequest.toManager) {
                throw new UnauthorizedException('User is not authorized to accept this transfer request');
            }

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
            const employee = await this.employeeModel.findById(pendingRequest.employee).session(session).exec();
            const fromManager = await this.employeeModel.findById(pendingRequest.fromManager).session(session).exec();
            const toManager = await this.employeeModel.findById(pendingRequest.toManager).session(session).exec();

            employee.manager = toManager._id;
            employee.positionTitle = pendingRequest.newPosition;
            toManager.manages.push(employee);
            fromManager.manages = fromManager.manages.filter((emp: Employee) => emp._id !== employee._id)

            await fromManager.save();
            await toManager.save()
            await employee.save();

            const description = `${employee.firstName} ${employee.firstName} was transferred from ${fromManager.firstName} ${fromManager.lastName} to ${toManager.firstName} ${toManager.lastName}`;
            const notificationEmployee = new this.notificationModel({ employeeId: employee._id, title: 'Manager Transfer', description:description});
            const notificationToManager = new this.notificationModel({ employeeId: fromManager._id, title: 'Manager Transfer', description:description});
            const notificationFromManager = new this.notificationModel({ employeeId: toManager._id, title: 'Manager Transfer', description:description});
            await this.notificationModel.create([notificationEmployee, notificationToManager, notificationFromManager],{session:session});

            await session.commitTransaction();
            return pendingRequest;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    //Reject the request
    //return the updatedRequest
    async rejectedRequest(requestId: number, user: Employee): Promise<ManagerRequest> {
        const pendingRequest = await this.managerRequestModel.findById(requestId).exec();

        if (user._id !== pendingRequest.toManager) {
            throw new UnauthorizedException('User is not authorized to reject this transfer request');
        }

        //if the status is not pending, means that this request has been processed
        //we throw exception
        if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };

        //set the status to rejected
        pendingRequest.status = RequestStatus.Rejcted;

        //update to the database
        await pendingRequest.save()
        return pendingRequest;
    }

        //Reject the request
    //return the updatedRequest
    async cancelRequest(requestId: number, user: Employee): Promise<ManagerRequest> {
        const pendingRequest = await this.managerRequestModel.findById(requestId).exec();

        if ((user._id !== pendingRequest.fromManager) && !user.isAdmin) {
            throw new UnauthorizedException('User is not authorized to cancel this transfer request');
        }

        //if the status is not pending, means that this request has been processed
        //we throw exception
        if (pendingRequest.status !== RequestStatus.Pending) { throw new ConflictException('This request has been processed already') };

        //set the status to rejected
        pendingRequest.status = RequestStatus.Canceled;

        //update to the database
        await pendingRequest.save()
        return pendingRequest;
    }

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

    //find all requests in the database
    async findAllRequest(): Promise<ManagerRequest[]> {
        return await this.managerRequestModel.find().populate('fromManager').populate('toManager').populate('employee').exec();
    }


    //find the request by requestId
    //return the entire request
    async findRequestById(requestId: number): Promise<ManagerRequest> {
        let result: DocumentType<ManagerRequest>;
        try {
            result = await this.managerRequestModel.findById(requestId).populate('fromManager').populate('toManager').populate('employee').exec();
        } catch (error) {
            throw new NotFoundException('This request does not exist');
        }

        if (!result) {
            throw new NotFoundException('This request does not exist');
        }
        return result
    }


    // We do not need to update a request since there's not many fields that can safely be updated except for previous and new position. Cancelling will suffice

    //updates a single field of an managerRequest model found
    //if we want to use this function make sure we cal the findRequestById
    //to check the existence of the request
    // async updateRequest(requestId: number, update: ManagerRequest): Promise<ManagerRequest> {
    //     // this takes a requestId parameter to find the request to change, and the request of type ManagerRequest is an object with the
    //     // modified fields already in place, so the service simply replaces the db entry
    //     try {
    //         return await this.managerRequestModel.findByIdAndUpdate(requestId, update, { new: true, useFindAndModify: false }).exec();
    //     } catch (error) {

    //         throw new NotFoundException('the request does not exist');
    //     }
    // }


    //get requests by employeeId
    async getRequestByEmployeeId(employeeId: number): Promise<ManagerRequest[]> {
        return await this.managerRequestModel.find({ employee: employeeId }).populate('fromManager').populate('toManager').populate('employee').exec();
    }
}

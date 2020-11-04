import { Employee } from './employee.model';
import { RequestStatus } from '../enums/request.enum';

export class ManagerRequest {
        _id?: number;
        employee: Employee;
        fromManager: Employee;
        toManager: Employee;
        previousPosition: string;
        newPosition: string;
        status?: RequestStatus;
        createdAt?: Date;
        updatedAt?: Date;
}

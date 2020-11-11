import { Employee } from './employee.model';
import { RequestStatus } from '../enums/request.enum';

export class ManagerRequest {
        _id?: number;
        employee: Employee | number;
        fromManager: Employee | number;
        toManager: Employee | number;
        previousPosition: string;
        newPosition: string;
        status?: RequestStatus;
        createdAt?: Date;
        updatedAt?: Date;
}

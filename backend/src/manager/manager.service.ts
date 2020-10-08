import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>
    
    ) {}

    // moves one employee to another in the db
    async transfer(requester: Employee & EmployeeAuth, manager: Employee, 
                    employee: Employee): Promise<Employee> {
        
        return null;
    }

}

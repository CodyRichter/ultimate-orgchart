import { Employee } from './employee.model';
import { Project } from './project.model';

export class ProjectsEmployee{
    _id?: number;
    employee: Employee;
    project: Project;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}


import { Employee } from './employee.model';
import { Project } from './project.model';

export class ProjectsEmployee{
    _id?: number;
    employee: Employee | number;
    project: Project | number;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}


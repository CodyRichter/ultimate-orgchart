import { ProjectsEmployee } from './projectsEmployee.model';

export class Employee {
    _id: number;
    firstName: string;
    lastName: string;
    companyId: number;
    positionTitle: string;
    companyName: string;
    isManager: boolean;
    isAdmin: boolean;
    managerId?: number;
    email: string;
    startDate: Date;
    manages: Employee[];
    projects: ProjectsEmployee[];
    createdAt?: Date;
    updatedAt?: Date;
}

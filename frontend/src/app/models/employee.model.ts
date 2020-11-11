import { ProjectsEmployee } from './projectsEmployee.model';

export class Employee {
    _id?: number;
    firstName: string;
    lastName: string;
    companyId: number;
    positionTitle: string;
    companyName: string;
    isManager: boolean;
    isAdmin: boolean;
    manager?: Employee | number;
    email: string;
    startDate: Date;
    manages: (Employee | number)[];
    projects: (ProjectsEmployee |number)[];
    createdAt?: Date;
    updatedAt?: Date;

    // frontend only feature
    highlight?: boolean;
}

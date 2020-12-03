import { ProjectsEmployee } from './projectsEmployee.model';

export class userProfile {
    _id?: number;
    firstName: string;
    lastName: string;
    companyId: number;
    positionTitle: string;
    companyName: string;
    isManager: boolean;
    isAdmin: boolean;
    manager?: userProfile | number;
    email: string;
    startDate: Date;
    manages: (userProfile | number)[];
    projects: (ProjectsEmployee |number)[];
    createdAt?: Date;
    updatedAt?: Date;

    // frontend only feature
    highlight?: boolean;
}



import { ProjectsEmployee } from "./projectsEmployee.model";

export class Project {
    _id: number;
    name: string;
    description: string;
    manager: ProjectsEmployee;
    employees: ProjectsEmployee[];
    createdAt?: Date;
    updatedAt?: Date;
}

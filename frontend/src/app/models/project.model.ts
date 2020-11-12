

import { ProjectsEmployee } from "./projectsEmployee.model";

export class Project {
    _id?: number;
    name: string;
    description: string;
    manager: ProjectsEmployee | number;
    employees: (ProjectsEmployee | number)[];
    createdAt?: Date;
    updatedAt?: Date;
}

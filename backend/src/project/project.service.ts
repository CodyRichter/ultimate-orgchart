import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";
import { RequestStatus } from '../enums/request.enum';
import { EmployeeService } from '../employee/employee.service';
import {Document} from 'mongoose';
import { Project} from "./project.model";
import { ProjectsEmployee } from "./projectsEmployee.model";
@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel:ReturnModelType<typeof Employee>,
        @InjectModel(Project) private readonly projectModel:ReturnModelType<typeof Project>,
        @InjectModel(ProjectsEmployee) private readonly projectsEmployeeModel:ReturnModelType<typeof ProjectsEmployee>,
    ){}


    async createProject(newProject:Project &{managerId?:number}):Promise<Project>
    {
        //get the manager from database
        const manager=await this.employeeModel.findById(newProject.managerId ? newProject.managerId : newProject.manager).populate("projects").exec();

        //
        const project=await this.projectModel.create(newProject);

        //create projectEmployee
        const projectEmployee=new this.projectsEmployeeModel({project:project,employee:manager,role:"project Manager",});
        const savedProjectEmployee=await this.projectsEmployeeModel.create(projectEmployee);
        
        savedProjectEmployee.employee=undefined;
        savedProjectEmployee.project=undefined;
        project.manager=savedProjectEmployee;
        manager.projects.push(savedProjectEmployee);
        project.save();
        manager.save();
        return project;
    }

    async getProject(projtectId:number)
    {
            return await this.projectModel.findById(projtectId).exec();

    }

    async getAllProjects()
    {
        return await this.projectModel.find().exec();
    }
}


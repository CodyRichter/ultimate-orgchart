import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Employee } from "../employee/employee.model";
import { DocumentType, mongoose, ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from "src/auth/auth.model";
import { RequestStatus } from '../enums/request.enum';
import { EmployeeService } from '../employee/employee.service';
import { Document } from 'mongoose';
import { Project } from "./project.model";
import { ProjectsEmployee } from "./projectsEmployee.model";
import { Session } from "inspector";
import { session } from "passport";
import { NotificationDoc } from "src/notification/notification.model";
@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(Project) private readonly projectModel: ReturnModelType<typeof Project>,
        @InjectModel(ProjectsEmployee) private readonly projectsEmployeeModel: ReturnModelType<typeof ProjectsEmployee>,
        @InjectModel(NotificationDoc) private readonly notificationModel:ReturnModelType<typeof NotificationDoc>,
    ) { }


    async createProject(newProject: Project): Promise<Project> {
        const session= await this.projectModel.db.startSession();

        session.startTransaction();

        try{
        //NOTE: get the manager from db
        const manager = await this.employeeModel.findById((newProject.manager as ProjectsEmployee).employee).session(session).exec();

        const managerRoleName: string = (newProject.manager as ProjectsEmployee).role;

        //have copy of lists of employees
        const newProjectEmployees: ProjectsEmployee[] = newProject.employees as ProjectsEmployee[];

        //made the manager undefined to pass the validation
        newProject.manager = undefined;
        newProject.employees = undefined;
        //create the project document 

         
        const projects = await this.projectModel.create([newProject],{session:session});
        const project = projects[0]


        //get the employee from db

        const notifications: DocumentType<NotificationDoc>[] =  [];
        const savedProjectsEmployees = await Promise.all(newProjectEmployees.map(
            async (projEmployee) => {
                const employee = await this.employeeModel.findById(projEmployee.employee).session(session).exec();
                projEmployee.employee = employee._id;
                projEmployee.project = project._id;
                const savedProjEmployee = await this.projectsEmployeeModel.create([projEmployee],{session:session});
                employee.projects.push(savedProjEmployee[0]._id);
                employee.save();
                const description=`New project ${project.name} was created and ${employee.firstName} ${employee.lastName} was added as an employee`;
                notifications.push(new this.notificationModel({employeeId:employee._id,title: 'Project Created',description:description}));
                if (employee.manager) {
                    notifications.push(new this.notificationModel({employeeId:employee.manager,title: 'Project Created',description:description}));
                }
                return savedProjEmployee[0];
            }
        ));
        
        //create the projectEmployee document for manager

        const projectEmployeeManager = new this.projectsEmployeeModel({ employee: manager._id, project: project._id, role: managerRoleName });
        //save to db
        
        const savedProjectEmployeeManagers = await this.projectsEmployeeModel.create([projectEmployeeManager],{session:session});
        const savedProjectEmployeeManager = savedProjectEmployeeManagers[0];
        
        // savedProjectEmployeeManager.project = undefined;
        // savedProjectEmployeeManager.employee = undefined;
        
        // const savedEmployees = await Promise.all(employees.map(
        //     async (employee, index) => {
        //         // savedProjectsEmployees[index][0].project = undefined;
        //         // savedProjectsEmployees[index][0].employee = undefined;
               
        //         employee.projects.push(savedProjectsEmployees[index]);   
        //         await employee.save();
                
        //         return employee;
        //     }
        // ));
       
     
        //we then need to upadate the field
        project.manager = savedProjectEmployeeManager;
        project.employees = savedProjectsEmployees;
        // for(let index=0;index<savedProjectsEmployees.length;index++)
        // {
        //     const projEmployee=savedProjectsEmployees[index][0];
        //     project[0].employees.push(projEmployee);
        // }

        manager.projects.push(savedProjectEmployeeManager);
        await project.save();
        await manager.save();

        //create notification to manager 
        const description=`New project ${project.name} was created and ${manager.firstName} ${manager.lastName} was added as the employee manager`;
        notifications.push(new this.notificationModel({employeeId:manager._id,title:'Project Created',description:description}));
        if (manager.manager) {
            notifications.push(new this.notificationModel({employeeId:manager.manager,title:'Project Created',description:description}));
        }
        await this.notificationModel.create(notifications,{session:session});

        // project.manager.employee = manager;
        // project.employees = project.employees.map(
        //     (projectEmployee: ProjectsEmployee, index) => {
        //         projectEmployee.employee = savedEmployees[index];
        //         return projectEmployee;
        //     }
        // )

        

        await session.commitTransaction();
        return project;
        }catch(error)
        {
                await session.abortTransaction();

                throw error;
        }finally{
            session.endSession();
        }
        //return await this.projectModel.findById(project._id).populate({path: 'manager', populate: {path: 'employee'}}).populate({path: 'employees', populate: {path: 'employee'}});
    }

    //create multiple projects
    async createProjects(newProjects: Project[]): Promise<Project[]> {
        return await Promise.all(newProjects.map(
            async (newProject) => {
                return await this.createProject(newProject);
            }
        ))
    }

    
    async getProject(projtectId: number) {
        return await this.projectModel.findById(projtectId).populate({path:'manager', populate: {path: 'employee'}}).populate({path:'employees', populate: {path: 'employee'}}).exec();

    }

    async getAllProjects() {
        return await this.projectModel.find().populate({path:'manager', populate: {path: 'employee'}}).populate({path:'employees', populate: {path: 'employee'}}).exec();
    }

    async deleteProject(projectId: number): Promise<Project> {

        const session =await this.projectModel.db.startSession();

        session.startTransaction();

        try{
            //get the project from db
            const deletedProject = await this.projectModel.findById(projectId).session(session).exec();
            //delete the project employee of manager
            const managerProjEmployee = await this.projectsEmployeeModel.findById(deletedProject.manager).session(session).exec();

            const managerEmployee = await this.employeeModel.findById(managerProjEmployee.employee).session(session).exec();
            managerEmployee.projects = managerEmployee.projects.filter((proj => proj !== managerProjEmployee._id));

            const notifications: DocumentType<NotificationDoc>[] =  [];

            //delete the  project employees that relate to this project
            await Promise.all(deletedProject.employees.map(async (employee) => {
            //delete each related projectsEmployee
            const updatedProjectEmployees = await this.projectsEmployeeModel.findById(employee).session(session).exec();
        
            //delete each related employee's projectEmployee reference
            const updatedEmployees = await this.employeeModel.findById(updatedProjectEmployees.employee).session(session).exec();
            updatedEmployees.projects = updatedEmployees.projects.filter(proj => proj !== updatedProjectEmployees._id);
            await updatedEmployees.save();
            await updatedProjectEmployees.remove();

            const description=`Project ${deletedProject.name} was deleted and ${updatedEmployees.firstName} ${updatedEmployees.lastName} was removed as an employee`;
            notifications.push(new this.notificationModel({employeeId:updatedEmployees._id,title: 'Project Deleted',description:description}));
            if (updatedEmployees.manager) {
                notifications.push(new this.notificationModel({employeeId:updatedEmployees.manager,title: 'Project Deleted',description:description}));
            }

        }));

        //delete project and manager 
        await deletedProject.remove();
        await managerProjEmployee.remove();
        await managerEmployee.save();


        //create notification to manager 
        const description=`Project ${deletedProject.name} was deleted and ${managerEmployee.firstName} ${managerEmployee.lastName} was removed as project manager`;
        notifications.push(new this.notificationModel({employeeId:managerEmployee._id,title:'Project Deleted',description:description}));
        if (managerEmployee.manager) {
            notifications.push(new this.notificationModel({employeeId:managerEmployee.manager,title:'Project Deleted',description:description}));
        }

        await this.notificationModel.create(notifications,{session:session});

        await session.commitTransaction();
        return deletedProject;

    }catch(error)
    {
        await session.abortTransaction();
        throw error;
    }finally{
         session.endSession();
    }
    }

    //update the project name or description
    async updateProjectDetail(projectId: number, update: any): Promise<Project> {

        if (update.hasOwnProperty('name') | update.hasOwnProperty('description')) {
            //update the project Model
            return await this.projectModel.findByIdAndUpdate(projectId, update, { new: true }).exec();
        }
        else {
            return null;
        }

    }

    //add project employee
    //we should expect the body send  {employee:employeeId, role:string}
    async addProjectEmployee(projectId: number, projectEmployees: ProjectsEmployee[]): Promise<Project> {

        const session=await this.projectModel.db.startSession();

        session.startTransaction();
        try
        {
        //check if the employee existed 
        const project = await this.projectModel.findById(projectId).session(session).exec();
        const notifications: DocumentType<NotificationDoc>[] =  [];

        await Promise.all(projectEmployees.map(async (projectEmployee) => {
            //find the employee
            const employee = await this.employeeModel.findById((projectEmployee as ProjectsEmployee).employee).session(session).exec();

            //if not exist throw error
            if (employee === null) {
                throw new NotFoundException('Employee not found');
            }

            //if exist
            //create the project employee then save to database
            const projEmployee = new this.projectsEmployeeModel({ employee: employee, role: projectEmployee.role, project: project });
            const savedProjEmployees = await this.projectsEmployeeModel.create([projEmployee],{session:session});
            const savedProjEmployee = savedProjEmployees[0];
            //push projEmployee to the project schema
            project.employees.push(savedProjEmployee);

            //update the employee schema 
            employee.projects.push(savedProjEmployee);


            //save the change
            await employee.save();

            const description=` ${employee.firstName} ${employee.lastName} was added as an employee to project ${project.name}`;
            notifications.push(new this.notificationModel({employeeId:employee._id,title: 'Employee Added to Project',description:description}));
            if (employee.manager) {
                notifications.push(new this.notificationModel({employeeId:employee.manager,title: 'Employee Added to Project',description:description}));
            }
        }));
        await project.save();
        await this.notificationModel.create(notifications,{session:session});

        await session.commitTransaction();
        return project;

        }catch(error)
        {
            await session.abortTransaction();
            throw error;  
        }finally{
             session.endSession();
        }
    }

    //delete project employee

    async deleteProjectEmployee(projectId:number,projectEmployees:ProjectsEmployee[]):Promise<Project>
    {
        const session=await this.projectModel.db.startSession();

        session.startTransaction();

        try{
        //check if the employee existed 
        const project = await this.projectModel.findById(projectId).session(session).exec();
        const notifications: DocumentType<NotificationDoc>[] =  [];

        await Promise.all(projectEmployees.map(async (projectEmployee) => {
            //find the employee
            console.log(projectEmployee)
            const projEmployee=await this.projectsEmployeeModel.findById(projectEmployee._id).session(session).exec();
            console.log(projEmployee);
            const employee = await this.employeeModel.findById(projEmployee.employee).session(session).exec();

            //if not exist throw error
            if (!employee || !projEmployee) {
                throw new NotFoundException('Employee not found on Project');
            }

            //if exist
            employee.projects=employee.projects.filter(projEmp=>projEmp !== projectEmployee._id);
            project.employees=project.employees.filter(projEmp=>projEmp!==projectEmployee._id);
            await projEmployee.remove();

            //save the change
            await employee.save();

            const description=` ${employee.firstName} ${employee.lastName} was removed as an employee from project ${project.name}`;
            notifications.push(new this.notificationModel({employeeId:employee._id,title: 'Employee Removed from Project',description:description}));
            if (employee.manager) {
                notifications.push(new this.notificationModel({employeeId:employee.manager,title: 'Employee Removed from Project',description:description}));
            }
        }));
        project.save();
        await this.notificationModel.create(notifications,{session:session});

        await session.commitTransaction();
        return project;

        }catch(error)
        {
            await session.abortTransaction();
            throw error;
        }finally{
             session.endSession();
        }

    }

    async generalSearch(query: string, skip = 0, limit = 10): Promise<Project[]> {
        let queri = {}
        queri = {
            $or: [{ name: { $regex: '.*' + query + '.*', $options: 'i' } },
            { description: { $regex: '.*' + query + '.*', $options: 'i' } }
            ]
        }

        return await this.projectModel.find(queri).populate({path:'manager', populate: {path: 'employee'}}).populate({path:'employees', populate: {path: 'employee'}}).skip(skip).limit(limit).exec();
    }


}


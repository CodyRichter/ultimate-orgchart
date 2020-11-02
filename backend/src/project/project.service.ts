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
@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
        @InjectModel(Project) private readonly projectModel: ReturnModelType<typeof Project>,
        @InjectModel(ProjectsEmployee) private readonly projectsEmployeeModel: ReturnModelType<typeof ProjectsEmployee>,
    ) { }



    async createProject(newProject: Project): Promise<Project> {
        //NOTE: get the manager from db
        const manager = await this.employeeModel.findById((newProject.manager as ProjectsEmployee).employee).populate('children').populate('projects').exec();

        //save the role name before undefined
        const managerRoleName: string = (newProject.manager as ProjectsEmployee).role;

        //have copy of lists of employees
        const newProjectEmployees: ProjectsEmployee[] = newProject.employees as ProjectsEmployee[];

        //made the manager undefined to pass the validation
        newProject.manager = undefined;
        newProject.employees = undefined;
        //create the project document 


        const project = await this.projectModel.create(newProject);


        //get the employee from db
        const employees: DocumentType<Employee>[] = [];

        const savedProjectsEmployees = await Promise.all(newProjectEmployees.map(
            async (projEmployee) => {
                const employee = await this.employeeModel.findById(projEmployee.employee).populate('children').populate('projects').exec();
                projEmployee.employee = employee;
                projEmployee.project = project;
                employees.push(employee);
                return await this.projectsEmployeeModel.create(projEmployee);
            }
        ));

        //create the projectEmployee document for manager

        const projectEmployeeManager = new this.projectsEmployeeModel({ employee: manager, project: project, role: managerRoleName });
        //save to db
        const savedProjectEmployeeManager = await this.projectsEmployeeModel.create(projectEmployeeManager);
        savedProjectEmployeeManager.project = undefined;
        savedProjectEmployeeManager.employee = undefined;

        const savedEmployees = await Promise.all(employees.map(
            async (employee, index) => {
                savedProjectsEmployees[index].project = undefined;
                savedProjectsEmployees[index].employee = undefined;
                employee.projects.push(savedProjectsEmployees[index]);
                await employee.save();
                return employee;
            }
        ));


        //we then need to upadate the field
        project.manager = savedProjectEmployeeManager;
        project.employees = savedProjectsEmployees;
        manager.projects.push(savedProjectEmployeeManager);


        await project.save();
        await manager.save();


        project.manager.employee = manager;
        project.employees = project.employees.map(
            (projectEmployee: ProjectsEmployee, index) => {
                projectEmployee.employee = savedEmployees[index];
                return projectEmployee;
            }
        )
        return project;
        //return await this.projectModel.findById(project._id).populate({path: 'manager', populate: {path: 'employee'}}).populate({path: 'employees', populate: {path: 'employee'}});
    }

    //create multiple projects
    async createProjects(newProjects: Project[]): Promise<Project[]> {
        return await Promise.all(newProjects.map(
            async (newProject) => {
                return this.createProject(newProject);
            }
        ))
    }

    async getProject(projtectId: number) {
        return await this.projectModel.findById(projtectId).populate('manager').populate('employees').exec();

    }

    async getAllProjects() {
        return await this.projectModel.find().populate('manager').populate('employees').exec();
    }

    async deleteProject(projectId: number): Promise<void> {

        //get the project from db
        const deletedProject = await this.projectModel.findById(projectId).populate("employees").populate("manager");
        //delete the project employee of manager
        const managerProjEmployee = await this.projectsEmployeeModel.findById((deletedProject.manager as ProjectsEmployee)._id).populate('employee').exec();

        const managerEmployee = await this.employeeModel.findById((managerProjEmployee.employee as Employee)._id).populate('projects').exec();
        managerEmployee.projects = managerEmployee.projects.filter((proj: ProjectsEmployee) => proj._id !== managerProjEmployee._id);


        //delete the  project employees that relate to this project
        await Promise.all(deletedProject.employees.map(async (employee) => {
            //delete each related projectsEmployee
            const updatedProjectEmployees = await this.projectsEmployeeModel.findById((employee as ProjectsEmployee)._id).populate('employee');
            //delete each related employee's projectEmployee reference
            const updatedEmployees = await this.employeeModel.findById((updatedProjectEmployees.employee as Employee)._id).populate('projects').exec();
            updatedEmployees.projects = updatedEmployees.projects.filter((proj: ProjectsEmployee) => proj._id !== updatedProjectEmployees._id);
            await updatedEmployees.save();
            await updatedProjectEmployees.remove();
        }));

        //delete project and manager 
        await deletedProject.remove();
        await managerProjEmployee.remove();
        await managerEmployee.save();

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
    async addProjectEmployee(projectId: number, projectEmployees: ProjectsEmployee[]): Promise<void> {
        //check if the employee existed 
        projectEmployees.map(async (projectEmployee) => {
            //find the
            const employee = await this.employeeModel.findById((projectEmployee as ProjectsEmployee).employee).populate('projects').exec();

            //if not exist throw error
            if (employee === null) {
                throw new NotFoundException('Employee not found');
            }

            //if exist
            //find the project from db
            const project = await this.projectModel.findById(projectId).populate('employees').populate('manager').exec();
            //create the project employee then save to database
            const projEmployee = new this.projectsEmployeeModel({ employee: employee, role: projectEmployee.role, project: project });
            const savedProjEmployee = await this.projectsEmployeeModel.create(projEmployee);
            //push projEmployee to the project schema
            project.employees.push(savedProjEmployee);

            //update the employee schema 
            employee.projects.push(savedProjEmployee);


            //save the change
            await project.save();
            await employee.save();
        })
    }


}


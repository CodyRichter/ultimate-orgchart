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
        let newProjectEmployees: ProjectsEmployee[] = newProject.employees as ProjectsEmployee[];

        //made the manager undefined to pass the validation
        newProject.manager = undefined;
        newProject.employees = undefined;
        //create the project document 


        const project = await this.projectModel.create(newProject);

        console.log(1);
        
        //get the employee from db
        const employees: DocumentType<Employee>[] = [];
       
        const savedProjectsEmployees = await Promise.all(newProjectEmployees.map(
            async (projEmployee) => {
                const employee = await this.employeeModel.findById(projEmployee.employee).populate('children').populate('projects').exec();
                projEmployee.employee = employee;
                projEmployee.project = project;
                return await this.projectsEmployeeModel.create(projEmployee);
            }
        ));

        console.log(newProjectEmployees);
        
        // const savedProjectsEmployees=await this.projectsEmployeeModel.insertMany(newProjectEmployees);
        // console.log(savedProjectsEmployees);
                    //this iteration is for getting the employee document to the projectsEmployeeModel
                    // const projectEmployees = await Promise.all(employees.map(
                    //     async (employee, index) => {
                    //         return new this.projectsEmployeeModel({ employee: employee, project: project, role: newEmployees[index].role });
                    //     }
                    // ));

                    // //save to database
                    // const savedProjectEmployees = await Promise.all(projectEmployees.map(
                    //     async (projectEmployee) => {
                    //         return await this.projectsEmployeeModel.create(projectEmployee);
                    //     }

                    // ));

        //create the projectEmployee document for manager

        console.log(2);
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
            }
        ));

        //we then need to upadate the field
        project.manager = savedProjectEmployeeManager;
        project.employees = savedProjectsEmployees;
        manager.projects.push(savedProjectEmployeeManager);
        console.log(3);
        
             
        console.log(4);

                        //update 
                        // for (let index = 0; index < savedProjectEmployees.length; index++) {

                        //     //add project to the corresponding employee
                        //     employees[index].projects.push(savedProjectEmployees[index]);
                        //     savedProjectEmployees[index].employee = undefined;
                        //     savedProjectEmployees[index].project = undefined;
                        //     //update the employee project info to database
                        //     await employees[index].save();

                        // }

        await project.save();
        await manager.save();
        console.log(5)
        // console.log(project);
        // return project;
        return await this.projectModel.findById(project._id).populate({path: 'manager', populate: {path: 'employee'}}).populate({path: 'employees', populate: {path: 'employee'}});
    }


    async getProject(projtectId: number) {
        return await this.projectModel.findById(projtectId).populate('manager').populate('employees').exec();

    }

    async getAllProjects() {
        return await this.projectModel.find().populate('manager').populate('employees').exec();
    }

    async deleteProject(projectId: number): Promise<void> {
       
        //get the project from db
        const deletedProject=await this.projectModel.findById(projectId).populate("employees").populate("manager");
        
        //delete the project employee of manager
        await this.projectsEmployeeModel.findByIdAndDelete((deletedProject.manager as ProjectsEmployee)._id);

        //delete the  project employees that relate to this project
        await Promise.all(deletedProject.employees.map(async (employee)=>{

            //delete each related employee
            await this.projectsEmployeeModel.findByIdAndDelete((employee as ProjectsEmployee)._id);
        }));
    }

    

}


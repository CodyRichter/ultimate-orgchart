import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee, Project, ProjectsEmployee } from '../../../models';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth/auth.service';
import { EmployeeService } from '../../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  formControl = new FormControl();
  assignees: any;
  employees: Employee[] = [];
  manager: Employee;

  selectedProjectName: string;
  selectedProjectDescription: string;

  projectId: number;
  project: Project;

  oldAssignees: number[];
  oldProjectEmployeeId: number[];

  constructor(private readonly projectService: ProjectService,
              private readonly authService: AuthService,
              private readonly employeeService: EmployeeService,
              private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private readonly snackBar: MatSnackBar) {
    if (data.project) {
      const project: Project = this.data.project;
      this.selectedProjectName = project.name;
      this.selectedProjectDescription = project.description;
      this.manager = ((project.manager as ProjectsEmployee).employee as Employee);
      this.assignees = ((project.employees as ProjectsEmployee[]).map(curr => curr.employee) as Employee[]);
      this.projectId = project._id;
      this.project = project;
      this.oldAssignees = project.employees.map(curr => ((curr as ProjectsEmployee).employee as Employee)._id);
      this.oldProjectEmployeeId = project.employees.map(curr => (curr as ProjectsEmployee)._id);
    }
    this.getAllEmployee().then();
  }

  ngOnInit(): void {
  }

  async createProj(): Promise<void> {
    const projEmployee = {
      employee: this.manager,
      project: null,
      role: 'Project Manager',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const projectAssignees: ProjectsEmployee[] = [];

    for (const assignee of this.assignees) {
      projectAssignees.push({
        employee: assignee,
        project: null,
        role: 'role TBD'
      });
    }

    const project = {
      name: this.selectedProjectName,
      description: this.selectedProjectDescription,
      manager: projEmployee,
      employees: projectAssignees
    };

    // projEmployee.project = project;

    console.log(project);
    console.log(await this.projectService.createProject(project));

    this.dialogRef.closeAll();

  }

  async updateProject(): Promise<void> {
    this.project.name = this.selectedProjectName;
    this.project.description = this.selectedProjectDescription;
    await this.projectService.updateProjectById(this.projectId, this.project);

    const newAssignees: number[] = this.assignees
      .filter(curr => !this.oldAssignees.includes((curr as Employee)._id))
      .map(curr => (curr as Employee)._id);

    const removeAssignees: number[] = [];

    for (let i = 0; i < this.oldAssignees.length; i++) {
      let toRemove = true;
      for (const assignee of this.assignees) {
        if ((assignee as Employee)._id === this.oldAssignees[i]) {
          toRemove = false;
          break;
        }
      }
      if (toRemove) {
        removeAssignees.push(this.oldProjectEmployeeId[i]);
      }
    }

    for (const na of newAssignees) {
      await this.projectService.addProjectEmployeeById(this.projectId, na);
    }

    for (const ra of removeAssignees) {
      await this.projectService.deleteProjectEmployeeById(this.projectId, ra);
    }

    console.log('hej hej');
    console.log(newAssignees);
    console.log(removeAssignees);

  }

  async getAllEmployee(): Promise<void> {
    // TODO
    for (let i = 1; i < 100; i++) {
      const employee = await this.employeeService.getEmployeeById(i);
      if (employee) {
        this.employees.push(employee);
      }
    }
  }

}

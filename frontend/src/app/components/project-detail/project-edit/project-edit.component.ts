import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee, Project, ProjectsEmployee } from '../../../models';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth/auth.service';
import { EmployeeService } from '../../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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

  constructor(private readonly projectService: ProjectService,
              private readonly authService: AuthService,
              private readonly employeeService: EmployeeService,
              private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data) {
    if (data.project) {
      const project: Project = this.data.project;
      this.selectedProjectName = project.name;
      this.selectedProjectDescription = project.description;
      this.manager = ((project.manager as ProjectsEmployee).employee as Employee);
      this.assignees = ((project.employees as ProjectsEmployee[]).map(curr => curr.employee) as Employee[]);
      this.projectId = project._id;
      this.project = project;
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

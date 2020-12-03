import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectsEmployee } from 'src/app/models';
import { JSONUploadDialog } from '../settings/settings.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {

  formControl = new FormControl();
  assignees: any;
  employees: Employee[] = [];
  manager: Employee;

  selectedProjectName: string;
  selectedProjectDescription: string;

  constructor(private readonly projectService: ProjectService,
              private readonly authService: AuthService,
              private readonly employeeService: EmployeeService,
              private dialogRef: MatDialog,
              public dialog: MatDialog,
              private readonly snackBar: MatSnackBar) {
  }

  async ngOnInit(): Promise<void> {
    await this.getAllEmployee();
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

    this.snackBar.open('Project has been created.',
      'Done', {
        horizontalPosition: 'end'
      });

  }

  async getAllEmployee(): Promise<void> {
    // TODO
    for (let i = 1; i < 100; i++) {
      this.employees.push(await this.employeeService.getEmployeeById(i));
    }
  }

  openJSONUploadDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(JSONUploadDialog, {
      data: {uploadProjectInsteadOfEmployee: true}
    });
  }
}

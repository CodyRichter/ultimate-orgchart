import { Component,EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { Employee, ProjectsEmployee, userProfile } from 'src/app/models/index';
import { EditNodeDialog, NodeDetailComponent } from 'src/app/modules/orgchart/chart-node/node-detail/node-detail.component';
import { StackListComponent } from 'src/app/modules/orgchart/chart-stack/stack-list/stack-list.component';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() nodeData: Employee;
  @Input() profileData: userProfile;

  @Output() nodeClick = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              private readonly employeeService: EmployeeService,
              private readonly projectService: ProjectService,
              public readonly authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.getProfile();
  }
  
  onNodeClick(): void {
    this.dialog.open(EditUserInfo, {
        data: { profileData: this.profileData }
    });
  }
  openJSONUploadDialog(): void {
    this.dialog.open(JSONUploadDialog);
  }

  async openMyEmployees(): Promise<void> {
    await this.authService.getProfile();
    this.dialog.open(StackListComponent, {
      data: { stackData: this.authService.profile.manages }
    });
  }

  async openMyProjects(): Promise<void> {
    await this.authService.getProfile();
    const projects = this.authService.profile.projects.map((projEmp: ProjectsEmployee) => projEmp.project);
    this.dialog.open(ProjectListComponent, {
      data: { projectData: projects}
    });
  }

  openEmployeeTransferDialog(): void {
    this.dialog.open(EmployeeTransferDialog, {data: {
      employee: undefined
    }});
  }

  openCreateEmployeeDialog(): void {
    this.dialog.open(CreateEmployeeDialog);
  }

  async downloadEmployeeJSON(): Promise<void> {
    await this.employeeService.downloadJSON();
  }

  async downloadProjectJSON(): Promise<void> {
    await this.projectService.downloadJSON();
  }

  openCreateProjectDialog(): void {
    this.dialog.open(ProjectCreateDialog);
  }
}

@Component({
  selector: 'json-upload-dialog',
  templateUrl: 'json-upload-dialog.html',
})
export class JSONUploadDialog {}

@Component({
  selector: 'employee-transfer-dialog',
  templateUrl: 'employee-transfer-dialog.html',
})
export class EmployeeTransferDialog {}

@Component({
  selector: 'create-employee-dialog',
  templateUrl: 'create-employee-dialog.html',
})
export class CreateEmployeeDialog {}

@Component({
  selector: 'project-create-dialog',
  templateUrl: 'project-create-dialog.html',
})
export class ProjectCreateDialog {}

@Component({
  selector: 'edit-user-info',
  templateUrl: 'edit-user-info.html',
})
export class EditUserInfo {}
import { Component,EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/index';
import { EditNodeDialog, NodeDetailComponent } from 'src/app/modules/orgchart/chart-node/node-detail/node-detail.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() nodeData: Employee;

  @Output() nodeClick = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              private readonly employeeService: EmployeeService,
              public readonly authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.getProfile();
  }
  
  onNodeClick(): void {
    this.dialog.open(EditNodeDialog, {
        data: { nodeData: this.nodeData }
    });
  }
  openJSONUploadDialog(): void {
    this.dialog.open(JSONUploadDialog);
  }

  openEmployeeTransferDialog(): void {
    this.dialog.open(EmployeeTransferDialog);
  }

  async downloadJSON(): Promise<void> {
    await this.employeeService.downloadJSON();
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
  selector: 'project-create-dialog',
  templateUrl: 'project-create-dialog.html',
})
export class ProjectCreateDialog {}
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private readonly employeeService: EmployeeService,
              private readonly authService: AuthService,) { }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.authService.profile.isAdmin;
  }

  isManager(): boolean {
    return this.authService.profile.isManager;
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

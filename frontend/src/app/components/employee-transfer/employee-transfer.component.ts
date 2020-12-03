import {Component, Inject, Input, OnInit} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'employee-transfer',
  templateUrl: './employee-transfer.component.html',
  styleUrls: ['./employee-transfer.component.css']
})
export class EmployeeTransferComponent implements OnInit {

  selectedEmployee: Employee;
  selectedManager: Employee;
  employees = [];
  managers = [];
  newTitle: string;
  onNodeDialog: boolean;

  constructor(private readonly employeeService: EmployeeService,
              private readonly managerService: ManagerService,
              private readonly authService: AuthService,
              private dialogRef: MatDialog,
              private readonly snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data.employee) {
      this.selectedEmployee = data.employee;
      this.onNodeDialog = true;
    }
  }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchManagers();
  }

  async fetchEmployees(): Promise<void> {
    this.employees = (await this.authService.getProfile()).manages;
    if (this.authService.profile.isAdmin) {
      this.employees = await this.employeeService.getAllEmployees();
    }
  }

  async fetchManagers(): Promise<void> {
    this.managers = await this.employeeService.getAllManagers();
  }

  async submitTransfer(): Promise<void> {
    const data = {
      employee: this.selectedEmployee,
      fromManager: this.selectedEmployee.manager ? this.selectedEmployee.manager as Employee : this.authService.profile,
      toManager: this.selectedManager,
      previousPosition: this.selectedEmployee.positionTitle,
      newPosition: this.newTitle
    };
    console.log(data);
    console.log(await this.managerService.createRequest(data));

    this.dialogRef.closeAll();

    this.snackBar.open('Request has been sent to ' + this.selectedManager.firstName + ' ' + this.selectedManager.lastName,
      'Done', {
      horizontalPosition: 'end'
    });

  }

}

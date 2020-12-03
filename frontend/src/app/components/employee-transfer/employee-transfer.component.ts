import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private readonly employeeService: EmployeeService, 
              private readonly managerService: ManagerService,
              private readonly authService: AuthService,
              private dialogRef: MatDialog) { }

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
  }

}

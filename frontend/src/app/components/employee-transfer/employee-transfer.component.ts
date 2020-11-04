import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';

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

  constructor(private readonly employeeService: EmployeeService, 
              private readonly managerService: ManagerService,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchManagers();
  }

  async fetchEmployees(): Promise<void> {
    this.employees = (await this.authService.getProfile()).manages;
  }

  async fetchManagers(): Promise<void> {
    this.managers = await this.employeeService.getAllManagers();
  }

  async submitTransfer(): Promise<void> {
    const data = {
      employee: this.selectedEmployee,
      fromManager: await this.authService.getProfile(),
      toManager: this.selectedManager,
      previousPosition: 'N/A',
      newPosition: 'N/A'
    };
    console.log(data);
    console.log(await this.managerService.createRequest(data));
  }

}
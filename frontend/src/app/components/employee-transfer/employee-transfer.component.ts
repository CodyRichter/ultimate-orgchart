import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'employee-transfer',
  templateUrl: './employee-transfer.component.html',
  styleUrls: ['./employee-transfer.component.css']
})
export class EmployeeTransferComponent implements OnInit {

  selectedEmployee: any;
  selectedManager: any;
  employees = [];
  managers = [];

  constructor(private readonly employeeService: EmployeeService, 
              private readonly managerService: ManagerService,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchManagers();
  }

  async fetchEmployees() {
    this.employees = this.authService.profile.manages;
  }

  async fetchManagers() {
    this.managers = await this.employeeService.getAllManagers();
  }

  async submitTransfer() {
    const data = {
      employee: this.selectedEmployee,
      fromManager: this.authService.profile,
      toManager: this.selectedManager,
      previousPosition: 'N/A',
      newPosition: 'N/A'
    };
    console.log(data);
    console.log(await this.managerService.createRequest(data));
  }

}
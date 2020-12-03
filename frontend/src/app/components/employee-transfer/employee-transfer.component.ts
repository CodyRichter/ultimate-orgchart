import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/search.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HttpClient } from '@angular/common/http';
import { emp } from 'src/app/app.component';

@Component({
  selector: 'employee-transfer',
  templateUrl: './employee-transfer.component.html',
  styleUrls: ['./employee-transfer.component.css']
})
export class EmployeeTransferComponent implements OnInit {
  @ViewChild('transferEmployeeScroll') virtualScrollEmployee: CdkVirtualScrollViewport;
  @ViewChild('transferManagerScroll') virtualScrollManager: CdkVirtualScrollViewport;

  selectedEmployee: Employee;
  selectedManager: Employee;
  ogEmployees = [];
  employees = [];
  managers = [];
  newTitle: string;
  nextEmployeeUrl: string;
  nextManagerUrl: string;
  seenEmployees = {};
  seenManagers = {};

  onNodeDialog = false;


  constructor(private readonly employeeService: EmployeeService,
              private readonly managerService: ManagerService,
              private readonly authService: AuthService,
              private readonly searchService: SearchService,
              private readonly httpClient: HttpClient,
              private dialogRef: MatDialog,
              private readonly snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data && data.employee) {
      this.selectedEmployee = data.employee;
      this.onNodeDialog = true;
    }
  }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchManagers();
  }

  trackByIdxEmployee(i) {
    console.log(i);
    return i;
  }

  trackByIdxManager(i) {
    console.log(i);
    return i;
  }

  async searchManager(query?: string): Promise<void> {
    if (!query) {
      query = (document.getElementById('transferManagerSearch') as HTMLInputElement).value;
    }
    console.log(query);
    this.managers = [];
    this.seenEmployees = {};
    const response = await this.searchService.searchManagers(query);
    this.managers = response.employees;
    this.managers.forEach((element, index) => {this.seenManagers[element._id] = index; });
    this.nextManagerUrl = response.nextEmployeeURL;
  }

  async searchEmployee(query?: string): Promise<void> {
    if (!query) {
      query = (document.getElementById('transferEmployeeSearch') as HTMLInputElement).value;
    }
    query = query.toLowerCase();
    console.log(query);

    if (this.authService.profile.isAdmin) {
      this.employees = [];
      this.seenEmployees = {};
      const response = await this.searchService.searchEmployee(query);
      this.employees = response.employees;
      this.employees.forEach((element, index) => {this.seenEmployees[element._id] = index; });
      this.nextEmployeeUrl = response.nextEmployeeURL;
    } else {
      this.employees = [];
      this.seenEmployees = {};
      this.employees = this.ogEmployees.filter((emp: Employee) => { if (query === '') {return true;} else {
        return emp.firstName.toLowerCase().includes(query) || emp.lastName.toLowerCase().includes(query)
        || emp.positionTitle.toLowerCase().includes(query) || emp.email.toLowerCase().includes(query)}});
      this.employees.forEach((element, index) => {this.seenEmployees[element._id] = index; });

    }

  }

  async nextEmployee(event: any): Promise <void > {
    console.log('next');
    if(this.nextEmployeeUrl) {
      const end = this.virtualScrollEmployee.getRenderedRange().end;
      console.log(end);
      const total = this.employees.length;
      console.log(end);
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        console.log(this.nextEmployeeUrl);
        const result = await this.httpClient.get(`http://${this.nextEmployeeUrl}`).toPromise() as any;
        this.nextEmployeeUrl = result.nextEmployeeURL;
        (result.employees as Employee[]).forEach(employee => {
          if (this.seenEmployees[employee._id]) {
            this.employees[this.seenEmployees[employee._id]] = employee;
          } else {
            this.employees.push(employee);
            this.seenEmployees[employee._id] = this.employees.length - 1;
          }
        });
        this.employees = this.employees.map(x => x);
        console.log(this.employees);
      }
    }
  }

  async nextManagers(event: any): Promise <void > {
    console.log('next');
    if(this.nextManagerUrl) {
      const end = this.virtualScrollManager.getRenderedRange().end;
      console.log(end);
      const total = this.managers.length;
      console.log(end);
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        console.log(this.nextManagerUrl);
        const result = await this.httpClient.get(`http://${this.nextManagerUrl}`).toPromise() as any;
        this.nextManagerUrl = result.nextEmployeeURL;
        (result.employees as Employee[]).forEach(employee => {
          if (this.seenManagers[employee._id]) {
            this.managers[this.seenManagers[employee._id]] = employee;
          } else {
            this.managers.push(employee);
            this.seenManagers[employee._id] = this.managers.length - 1;
          }
        });
        this.managers = this.managers.map(x => x);
        console.log(this.managers);
      }
    }
  }

  async fetchEmployees(): Promise<void> {

    if (this.authService.profile.isAdmin) {
      await this.searchEmployee('.');
    } else {
      this.employees = (await this.authService.getProfile()).manages;
      this.ogEmployees = (await this.authService.getProfile()).manages;
      this.employees.forEach((element, index) => {this.seenEmployees[element._id] = index; });
    }
  }

  async fetchManagers(): Promise<void> {
    await this.searchManager('.');
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

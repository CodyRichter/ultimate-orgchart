import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JSONUploadDialog } from '../settings/settings.component';
import { SearchService } from 'src/app/services/search.service';
import { HttpClient } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

 
  isAdminLoggedIn = false;
  originalCompanyID:number;
  originalCompanyName:string;
  selectedManager: Employee;
  managers = [];
  hide = true;
  manager: Employee;
  empID: number;
  firstName: string;
  lastName: string;
  companyId  = 5;
  positionTitle: string;
  companyName: string;
  isManager: boolean;
  isAdmin: boolean;
  startDate: Date;
  password: string;
  employees: Employee[] = [];
  
  email = new FormControl('', [Validators.required, Validators.email]);
  nextUrl: string;
  seenEmployees = {};

  constructor(private readonly employeeService: EmployeeService,
              private readonly searchService: SearchService,
              private readonly httpClient: HttpClient,
              private readonly authService: AuthService,
              public dialog: MatDialog,
              private readonly snackBar: MatSnackBar) {
              }

  async ngOnInit(): Promise<void> {
    if (this.authService.profile.isAdmin) {
      this.isAdminLoggedIn = true;
    }
    this.search('.');
    this.isAdmin = false;
    this.isManager = false;
    this.originalCompanyID = (await this.authService.getProfile()).companyId;
    this.originalCompanyName = (await this.authService.getProfile()).companyName;
    this.companyId = this.originalCompanyID;
    this.companyName = this.originalCompanyName;
  }

  async search(query?: string): Promise<void> {
    if (!query) {
      query = (document.getElementById('addEmployeeSearch') as HTMLInputElement).value;
    }
    console.log(query);
    this.managers = [];
    this.seenEmployees = {};
    const response = await this.searchService.searchManagers(query);
    this.managers = response.employees;
    this.managers.forEach((element, index) => {this.seenEmployees[element._id] = index; });
    this.nextUrl = response.nextEmployeeURL;
  }

  trackByIdx(i) {
    console.log(i);
    return i;
  }

  async nextEmployee(event: any): Promise <void > {
    console.log('next');
    if(this.nextUrl) {
      const end = this.virtualScroll.getRenderedRange().end;
      console.log(end);
      const total = this.managers.length;
      console.log(end);
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        console.log(this.nextUrl);
        const result = await this.httpClient.get(`http://${this.nextUrl}`).toPromise() as any;
        this.nextUrl = result.nextEmployeeURL;
        (result.employees as Employee[]).forEach(employee => {
          if (this.seenEmployees[employee._id]) {
            this.managers[this.seenEmployees[employee._id]] = employee;
          } else {
            this.managers.push(employee);
            this.seenEmployees[employee._id] = this.managers.length - 1;
          }
        });
        this.managers = this.managers.map(x => x);
        console.log(this.managers);
      }
    }
  }


  async createEmp(): Promise<void> {
    const newEmployee = {
      _id: this.empID,
      firstName : this.firstName,
      lastName: this.lastName,
      companyId: this.companyId,
      positionTitle: this.positionTitle,
      companyName: this.companyName,
      isManager: this.isManager,
      isAdmin: this.isAdmin,
      manager: this.selectedManager,
      email: this.email.value,
      startDate: this.startDate,
      manages: [],
      projects: [],
      password: this.password
    };
    console.log(newEmployee);
    console.log(await this.employeeService.createEmployee(newEmployee));
    this.snackBar.open(this.firstName + ' ' + this.lastName + ' has been created.',
      'Done', {
        horizontalPosition: 'end'
      });
  }

  changeIsManagerValue(event){
    this.isManager = event.checked;
  }

  changeIsAdminValue(event){
    this.isAdmin = event.checked;
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openJSONUploadDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(JSONUploadDialog, {data: {}});
  }
}

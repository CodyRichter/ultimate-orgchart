import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  isAdminLoggedIn = false;
  originalCompanyID:number;
  originalCompanyName:string;
  selectedManager: Employee;
  managers = [];
  date: string;
  hide = true;
  manager: Employee;
  empID: number;
  firstName: string;
  lastName: string;
  companyId: number;
  positionTitle: string;
  companyName: string;
  isManager: boolean;
  isAdmin: boolean;
  startDate: Date;
  password: string;
  employees: Employee[] = [];
  roomsFilter: any = {};

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private readonly employeeService: EmployeeService,
              private readonly authService: AuthService) { 
                this.getAllEmployee().then();
              }

  ngOnInit(): void {
    if(this.authService.profile.isAdmin) {
      this.isAdminLoggedIn = true;
    }
    this.fetchManagers();
    this.isAdmin = false;
    this.isManager = false;
    this.companyId = this.originalCompanyID;
    this.companyName = this.originalCompanyName;
  }

  public onDate(event: any): void {
    this.roomsFilter.date = event.value;
    console.log(this.roomsFilter.date);
  }

  async fetchManagers(): Promise<void> {
    this.managers = await this.employeeService.getAllManagers();
  }

  async createEmp(): Promise<void> {
    this.startDate = new Date(this.date);
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
  }

  changeIsManagerValue(event){
    this.isManager = event.checked;
  }

  changeIsAdminValue(event){
    this.isAdmin = event.checked;
  }

  async getAllEmployee(): Promise<void> {
    for (let i = 1; i < 100; i++) {
      this.employees.push(await this.employeeService.getEmployeeById(i));
    }
    let e = this.employees[1];
    this.originalCompanyID = e.companyId;
    this.originalCompanyName= e.companyName;
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
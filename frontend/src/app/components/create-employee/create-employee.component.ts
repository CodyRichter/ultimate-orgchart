import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
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

  //managers = this.getAllManagers()
  
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private readonly employeeService: EmployeeService,
              private readonly authService: AuthService) { 
                this.getAllEmployee().then();
              }

  ngOnInit(): void {
    if(this.authService.profile.isAdmin || this.authService.profile.isManager) {
      this.fetchManagers();
      this.isAdmin = false;
      this.isManager = false;
      this.companyId = this.originalCompanyID;
      this.companyName = this.originalCompanyName;
    }
  }

  public onDate(event: any): void {
    this.roomsFilter.date = event.value;
    // // console.log(this.roomsFilter.date);
  }

  async fetchManagers(): Promise<void> {
    this.managers = await this.employeeService.getAllManagers();
    /* this.employees.push(await this.employeeService.getEmployeeById(2));
    let e = this.employees[0];
    this.originalCompanyID = e.companyId;
    this.originalCompanyName= e.companyName; */
  }

  async createEmp(): Promise<void> {
    // // console.log(this.managers);
    // // console.log(this.selectedManager);
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
    // console.log(newEmployee);
    // console.log(await this.employeeService.createEmployee(newEmployee));
  }

  changeIsManagerValue(event){
    // console.log(this.date);
    this.isManager = event.checked;
    //// console.log(this.isManager);
    /* var event1 = new Date(this.date);
    let d = JSON.stringify(event1);
    d = d.slice(1,11);
    this.startDate = new Date(d);
    // console.log(typeof(this.startDate));
    // console.log(this.startDate);
 */
  }

  changeIsAdminValue(event){
    this.isAdmin = event.checked;
  }

  async getAllEmployee(): Promise<void> {
    // TODO
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
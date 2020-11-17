import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
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

  managers = this.getAllManagers()
  
  id = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
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
      manager: this.manager,
      email: this.email.value,
      startDate: this.startDate,
      manages: [],
      projects: [],
      password: this.password
    };
    //console.log(await this.employeeService.createEmployee(newEmployee))
  }
/* 
  onDate(event){
    console.log(event);  
  } */

  public onDate(event: any): void {
    this.roomsFilter.date = event.value;
    console.log(this.roomsFilter.date);
  }

  changeIsManagerValue(event){
    console.log(this.date);
    this.isManager = event.checked;
    console.log(this.isManager);
  }

  changeIsAdminValue(event){
    this.isAdmin = event.checked;
  }

  async getAllManagers(): Promise<void> {
    for (let i=0; i<100;i++) {
      this.employees.push(await this.employeeService.getEmployeeById(i));
    }
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage() {
    return this.id.hasError('required')? 'You must enter a value':'';
  }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

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
    console.log(await this.employeeService.createEmployee(newEmployee))
  }

  async getAllManagers(): Promise<void> {
    for (let i=0; i<100;i++) {
      this.employees.push(await this.employeeService.getEmployeeById(i));
    }
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email')? 'Not a valid email': '';
  }

  getErrorMessage() {
    return this.id.hasError('required')? 'You must enter a value':'';
  }

}
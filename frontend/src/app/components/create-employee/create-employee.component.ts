import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  id = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email])
  constructor() { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email')? 'Not a valid email': '';
  }

  getErrorMessage() {
    return this.id.hasError('required')? 'You must nter a value':'';
  }

}
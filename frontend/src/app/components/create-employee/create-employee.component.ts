import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  id = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])
  constructor() { }

  newEmployee: FormGroup;

  ngOnInit(): void {
  }

  

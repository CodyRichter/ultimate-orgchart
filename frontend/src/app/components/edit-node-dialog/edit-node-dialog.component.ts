import { Component, Inject, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/index';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-node-dialog',
  templateUrl: './edit-node-dialog.component.html',
  styleUrls: ['./edit-node-dialog.component.css']
})
export class EditNodeDialogComponent implements OnInit {
  nodeData : Employee;
  firstName:string;
  lastName:string;
  empID:number;
  companyId:number;
  positionTitle:string;
  companyName:string;
  isManager:boolean;
  isAdmin:boolean;
  email:string;
  selectedEmployeeFirstName: any;
  controller: FormControl;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private readonly employeeService: EmployeeService,
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar) {
    this.nodeData = data.nodeData;
    this.lastName = this.nodeData.lastName;
    this.companyName = this.nodeData.companyName;
    this.firstName = this.nodeData.firstName;
  }

  ngOnInit(): void {

  }

    async editEmployee(): Promise<any> {
      const editedEmp = {
      _id: this.nodeData._id,
      firstName: this.firstName,
      lastName: this.lastName,
      companyId: this.nodeData.companyId,
      positionTitle: this.nodeData.companyName,
      companyName: this.companyName,
      isManager: this.nodeData.isManager,
      isAdmin: this.nodeData.isAdmin,
      manager: this.nodeData.manager,
      email: this.nodeData.email,
      startDate: this.nodeData.startDate,
      manages: this.nodeData.manages,
      projects: this.nodeData.projects,
      createdAt: this.nodeData.createdAt,
      updatedAt: this.nodeData.updatedAt,
    // frontend only feature
      highlight: this.nodeData.highlight
      };
    await this.employeeService.updateEmployee(editedEmp);

    this.snackBar.open('Employee info has been updated.',
      'Done', {
        horizontalPosition: 'end'
      });
    }
}



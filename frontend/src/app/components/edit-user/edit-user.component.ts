import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/index';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  nodeData: Employee;
  firstName: string;
  lastName: string;
  empID:number;
  companyId:number;
  positionTitle:string;
  companyName:string;
  isManager:boolean;
  isAdmin:boolean;
  email:string;
  profileUser:any;
  

  constructor(private readonly employeeService: EmployeeService, private readonly authService: AuthService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.getProfileDetails();
    // this.lastName = this.profileUser.lastName;
    // this.email = this.profileUser.email;
  }

  ngOnInit():void {
    this.getProfileDetails();
  }

    async getProfileDetails() {
      const user = await this.authService.getProfile();
      console.log(user);
      this.profileUser = user;
      this.firstName = this.profileUser.firstName;
      this.lastName = this.profileUser.lastName;
      this.companyName = this.profileUser.companyName;
      return user;
    }


    async editUser(): Promise<void> {
      const editedUser = {
      _id: this.profileUser._id,
      firstName: this.firstName,
      lastName: this.lastName,
      companyId: this.profileUser.companyId,
      positionTitle: this.profileUser.companyName,
      companyName: this.companyName,
      isManager: this.profileUser.isManager,
      isAdmin: this.profileUser.isAdmin,
      manager: this.profileUser.manager,
      email: this.profileUser.email,
      startDate: this.profileUser.startDate,
      manages: this.profileUser.manages,
      projects: this.profileUser.projects,
      createdAt: this.profileUser.createdAt,
      updatedAt: this.profileUser.updatedAt,
    // frontend only feature
      highlight: this.profileUser.highlight
      };
      
      await this.employeeService.updateEmployee(editedUser);
    }
}

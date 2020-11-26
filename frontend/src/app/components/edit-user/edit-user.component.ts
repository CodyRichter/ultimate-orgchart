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
  profileUser:Employee
  

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly employeeService: EmployeeService, private readonly authService: AuthService) { 
    this.nodeData = data.nodeData;
    this.profileUser = data.profileUser;
  }

  ngOnInit(): void {
  }

    // console.log(project);
    // console.log(await this.projectService.createProject(project));
    async getProfileDetails(): Promise<string> {
      const user = await this.authService.getProfile();
      return user.firstName;
    }

    async editUser(): Promise<void> {
      const user = await this.authService.getProfile();
      var profileUser = this.authService.getProfile();
      const editedUser = {
      _id: user._id,
      firstName: this.firstName,
      lastName: this.lastName,
      companyId: user.companyId,
      positionTitle: user.companyName,
      companyName: user.companyName,
      isManager: user.isManager,
      isAdmin: user.isAdmin,
      manager: user.manager,
      email: this.email,
      startDate: user.startDate,
      manages: user.manages,
      projects: user.projects,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    // frontend only feature
      highlight: user.highlight
      };

      console.log(editedUser);
      console.log(await this.employeeService.updateEmployee(editedUser));
    }
}

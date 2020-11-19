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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly employeeService: EmployeeService, private readonly authService: AuthService) { 
    this.nodeData = data.nodeData;
  }

  ngOnInit(): void {
    this.firstName=this.nodeData.firstName;
  }

    // console.log(project);
    // console.log(await this.projectService.createProject(project));
    async getUser(): Promise<any>{
      const user = await this.authService.getProfile();
      return user;
    }

    async editUser(): Promise<void> {
      const user = await this.authService.getProfile();
      console.log(user);
      const editedUser = {
      _id: this.empID,
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

export class emp{
  firstName: string;
  lastName: string;
  empID:number;
  companyId:number;
  positionTitle:string;
  companyName:string;
  isManager:boolean;
  isAdmin:boolean;
  email:string;
}

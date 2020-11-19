import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/index';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-node-dialog',
  templateUrl: './edit-node-dialog.component.html',
  styleUrls: ['./edit-node-dialog.component.css']
})
export class EditNodeDialogComponent implements OnInit {
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
  selectedEmployeeFirstName: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly employeeService: EmployeeService) { 
    this.nodeData = data.nodeData;
  }

  ngOnInit(): void {

  }

    // console.log(project);
    // console.log(await this.projectService.createProject(project));

    async editEmployee(): Promise<void> {
      const editedEmp = {
        _id: this.empID,
      firstName: this.firstName,
      lastName: this.lastName,
      companyId: this.nodeData.companyId,
      positionTitle: this.nodeData.companyName,
      companyName: this.nodeData.companyName,
      isManager: this.nodeData.isManager,
      isAdmin: this.nodeData.isAdmin,
      manager: this.nodeData.manager,
      email: this.email,
      startDate: this.nodeData.startDate,
      manages: this.nodeData.manages,
      projects: this.nodeData.projects,
      createdAt: this.nodeData.createdAt,
      updatedAt: this.nodeData.updatedAt,
    // frontend only feature
      highlight: this.nodeData.highlight
      };

      console.log(editedEmp);
      console.log(await this.employeeService.updateEmployee(editedEmp));
    }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee, Project, ProjectsEmployee } from 'src/app/models/index';
import { MatDialog } from '@angular/material/dialog';
 import { MatMenuModule} from '@angular/material/menu';
import { EmployeeService } from '../../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartColorComponent } from '../../chart-color/chart-color.component';
import { ProjectService } from 'src/app/services/project.service';
import { EmployeeTransferComponent } from 'src/app/components/employee-transfer/employee-transfer.component';
import { ProjectDetailComponent } from 'src/app/components/project-detail/project-detail.component';
@Component({
  selector: 'chart-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  nodeData: Employee;
  projects: Project[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private readonly employeeService: EmployeeService,
              private readonly snackbar: MatSnackBar,
              private readonly color: ChartColorComponent,
              private readonly dialog: MatDialog, private readonly projectService:ProjectService) {
    this.nodeData = data.nodeData;
    this.fetchProjects().then();
  }

  ngOnInit(): void {
  }

  async fetchProjects(): Promise<void>{
    this.projects = await this.projectService.getProjectsByEmployeeId(this.nodeData._id);
  }

  onDetailsClick(project: Project): void {
    this.dialog.open(ProjectDetailComponent, {
        data: { project }
    });
  }

  async onNavigateClick(project: Project): Promise<void> {
    const projectManager = (project.manager as ProjectsEmployee).employee as Employee;
    projectManager.manager = undefined;
    projectManager.manages = (project.employees as ProjectsEmployee[]).map((projEmployee: ProjectsEmployee) => {
      const employee = projEmployee.employee as Employee;
      employee.manages = [];
      return employee;
    });

    this.employeeService.pushNewRoot({root: projectManager, curNav: projectManager, 
      name: 'Project Search: ' + project.name, deletable: true});

    this.dialog.closeAll();
  }

  openEditNodeDialog(): void {
    this.dialog.open(EditNodeDialog, {
      data: { nodeData: this.nodeData }
  });
  }

  getColor(pos: string): string {
    return 'background-color: ' + this.color.getHexColor(pos) + ';';
  }

  async onDeleteEmployee(): Promise<void> {
    await this.employeeService.deleteEmployeeById(this.nodeData._id);
    this.snackbar.open(this.nodeData.firstName + ' ' + this.nodeData.lastName + ' has been removed.',
          'Done', {horizontalPosition: 'end'});
  }

  async onTransferEmployee(): Promise<void> {
    this.dialog.open(EmployeeTransferComponent, {data: {
      employee: this.nodeData
    }});
  }

}

export class emp {
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


@Component({
  selector: 'edit-node-dialog',
  templateUrl: 'edit-node-dialog.html',
})
export class EditNodeDialog {}

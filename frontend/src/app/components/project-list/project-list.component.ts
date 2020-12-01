import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee, Project, ProjectsEmployee } from 'src/app/models';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input() projectData: Project[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService) {
    if (data.projectData) {
      this.projectData = data.projectData;
    }
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
    this.employeeService.curSubtree = projectManager;
    // console.log(this.employeeService.curSubtree);
    this.dialog.closeAll();
  }


  ngOnInit(): void {
  }


}

import {Component, Input, OnInit} from '@angular/core';
import {Employee, Project, ProjectsEmployee} from '../../../../../models';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../../../../../services/employee.service';
import {ProjectDetailComponent} from '../../../../../components/project-detail/project-detail.component';

@Component({
  selector: 'app-employee-project-list',
  templateUrl: './employee-project-list.component.html',
  styleUrls: ['./employee-project-list.component.css']
})
export class EmployeeProjectListComponent implements OnInit {

  @Input() projectData: Project[];

  constructor(private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService,
              private readonly projectDetail: ProjectDetailComponent) {
  }

  onDetailsClick(project: Project): void {
    // this.dialog.open(ProjectDetailComponent, {
    //   data: { project }
    // });
    this.projectDetail.openProjectDialog(project);
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
    this.dialog.closeAll();
  }


  ngOnInit(): void {
  }

}

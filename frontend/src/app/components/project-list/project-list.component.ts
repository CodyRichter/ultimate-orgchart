import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  seenProjects = {};

  @Input() projectData: Project[] = [];
  @Input() nextUrl: string = undefined;


  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private readonly dialog: MatDialog,
              private readonly employeeService: EmployeeService, private readonly httpClient: HttpClient) {
    if (data.projectData) {
      this.projectData = data.projectData;
    }
    if (data.nextUrl) {
      this.nextUrl = data.nextUrl;
    }

    if (this.projectData) {
      this.projectData.forEach((element, index) => {this.seenProjects[element._id] = index; });
      console.log('mapping done');
    }
  }

  async nextProject(event: any): Promise <void > {
    console.log('next');
    if(this.nextUrl) {
      const end = this.virtualScroll.getRenderedRange().end;
      console.log(end);
      const total = this.projectData.length;
      console.log(end);
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        console.log(this.nextUrl);
        const result = await this.httpClient.get(`http://${this.nextUrl}`).toPromise() as any;
        this.nextUrl = result.nextEmployeeURL;
        (result.projects as Project[]).forEach(project => {
          if (this.seenProjects[project._id]) {
            this.projectData[this.seenProjects[project._id]] = project;
          } else {
            this.projectData.push(project);
            this.seenProjects[project._id] = this.projectData.length - 1;
          }
        });
        this.projectData = this.projectData.map(x => x);
        console.log(this.projectData);
      }
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

    this.employeeService.pushNewRoot({root: projectManager, curNav: projectManager, 
      name: 'Project Search: ' + project.name, deletable: true});

    this.dialog.closeAll();
  }


  ngOnInit(): void {
  }


}

import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../models';
import { Employee } from '../../models';
import { ProjectsEmployee} from '../../models';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { FormControl } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import {ProjectEditComponent} from './project-edit/project-edit.component';
import { NodeDetailComponent } from 'src/app/modules/orgchart/chart-node/node-detail/node-detail.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;

  editDescription = false;
  projectDescription: string;

  editProjectName = false;
  projectName: string;

  projectEmployees: Employee[];

  formControl = new FormControl();
  assignees: any;
  employees: Employee[] = [];
  manager: Employee;
  projectManager: Employee[];

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private readonly projectService: ProjectService,
              private readonly employeeService: EmployeeService,
              private readonly dialog: MatDialog) {
    if (data.project) {
      this.project = data.project;
      this.projectDescription = this.project.description;
      this.projectName = this.project.name;
      console.log(this.project);
      this.projectEmployees = (this.project.employees as ProjectsEmployee[]).map(curr => curr.employee as Employee);
      console.log(this.projectEmployees);
      this.projectManager = [((this.project.manager as ProjectsEmployee).employee as Employee)];
    }
    this.getAllEmployee().then();
  }

  ngOnInit(): void {
  }


  onDetailsClick(node: Employee): void {
    this.dialog.open(NodeDetailComponent, {
        data: { nodeData: node }
    });
  }

  async onNavigateClick(node: Employee): Promise<void> {
    await this.employeeService.goDownInChart(node, true);
    this.dialog.closeAll();
  }

  async navigateToManager(node: Employee): Promise<void> {
    await this.employeeService.goUpInChart(node, true);
    this.dialog.closeAll();
  }

  trackByIdx(i) {
    console.log(i);
    return i;
  }

  getManagerName(): string {
    const manager: Employee = ((this.project.manager as ProjectsEmployee).employee as Employee);
    return manager.firstName + ' ' + manager.lastName;
  }

  getAssigneesName(): string {
    let r = '';
    for (const assignee of this.project.employees) {
      const employee = (assignee as ProjectsEmployee).employee as Employee;
      r += employee.firstName + ' ' + employee.lastName + ', ';
    }
    return r.slice(0, -2);
  }

  async onSaveDescription(): Promise<void> {
    this.editDescription = false;
    await this.projectService.updateProjectDescription(this.project._id, this.projectDescription);
    this.project = await this.projectService.getProjectById(this.project._id);
  }

  async onSaveTitle(): Promise<void> {
    this.editProjectName = false;
    await this.projectService.updateProjectName(this.project._id, this.projectName);
    this.project = await this.projectService.getProjectById(this.project._id);
  }

  async onDeleteProject(): Promise<void> {
    await this.projectService.deleteProjectById(this.project._id);
  }

  async getAllEmployee(): Promise<void> {
    // TODO
    for (let i = 1; i < 100; i++) {
      this.employees.push(await this.employeeService.getEmployeeById(i));
    }
  }

  onEditProject(): void {
    this.dialog.open(ProjectEditComponent, {data: {project: this.project}});
  }

  openProjectDialog(project: Project): void {
    this.dialog.open(ProjectDetailComponent, { data: {project} });
  }

}

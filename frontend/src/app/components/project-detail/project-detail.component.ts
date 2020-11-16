import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../models';
import { Employee } from '../../models';
import { ProjectsEmployee} from '../../models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private readonly projectService: ProjectService) {
    if (data.project) {
      this.project = data.project;
      this.projectDescription = this.project.description;
      this.projectName = this.project.name;
    }
  }

  ngOnInit(): void {
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
    this.project = await this.projectService.getProject(this.project._id);
  }

  async onSaveTitle(): Promise<void> {
    this.editProjectName = false;
    await this.projectService.updateProjectName(this.project._id, this.projectName);
    this.project = await this.projectService.getProject(this.project._id);
  }

  async onDeleteProject(): Promise<void> {
  }



}

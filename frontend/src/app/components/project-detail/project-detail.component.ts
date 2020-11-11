import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../models';
import { Employee } from '../../models';
import { ProjectsEmployee} from '../../models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    if (data.project) {
      this.project = data.project;
    }
  }

  ngOnInit(): void {
  }

  getManagerName(): string {
    const manager: Employee = ((this.project.manager as ProjectsEmployee).employee as Employee);
    return manager.firstName + ' ' + manager.lastName;
  }

}

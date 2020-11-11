import { Component, Inject, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models';
import {HttpClient} from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private readonly projectService: ProjectService,
              private readonly httpClient: HttpClient) {
          if (data.project) {
            this.project = data.project;
          }
  }

  ngOnInit(): void {
    // console.log(this.projectService.getAllProjects().then(val => this.project = val[val.length - 1]));
  }

}

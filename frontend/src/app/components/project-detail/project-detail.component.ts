import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;

  constructor(private readonly projectService: ProjectService,
              private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.projectService.getAllProjects().then(val => this.project = val[val.length - 1]));
  }

}

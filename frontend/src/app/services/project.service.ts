import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly httpClient:HttpClient) { }

  async createProject(project: Project): Promise<Project> {
    return await this.httpClient.post('http://localhost:3000/project/create', project).toPromise() as Project;
  }
}



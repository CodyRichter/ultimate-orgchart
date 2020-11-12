import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models';
import {ProjectsEmployee } from '../models';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly httpClient: HttpClient) { }

  async createProject(project: Project): Promise<Project> {
    return await this.httpClient.post('http://localhost:3000/project/create', project).toPromise() as Project;
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.httpClient.get('http://localhost:3000/project/all').toPromise() as Project[];
  }

  async addProjectEmployee(projectId: number, projectEmployees: ProjectsEmployee[]): Promise<void>{
    await this.httpClient.patch('http://localhost:3000/project/addEmployees/' + projectId, projectEmployees).toPromise();
  }
}





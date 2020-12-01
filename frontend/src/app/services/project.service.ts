import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../models';
import {ProjectsEmployee } from '../models';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly httpClient: HttpClient) { }

  async createProject(project: Project): Promise<Project> {
    return await this.httpClient.post(environment.SERVER_URL + 'project/create', project).toPromise() as Project;
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.httpClient.get(environment.SERVER_URL + 'project/all').toPromise() as Project[];
  }

  async addProjectEmployee(projectId: number, projectEmployees: ProjectsEmployee[]): Promise<void>{
    await this.httpClient.patch(environment.SERVER_URL + 'project/addEmployees/' + projectId, projectEmployees).toPromise();
  }

  async updateProjectDescription(projectId: number, projectDescription: string): Promise<void> {
    await this.httpClient.patch(environment.SERVER_URL + 'project/' + projectId, {
      description: projectDescription
    }).toPromise();
  }

  async getProjectById(projectId: number): Promise<Project> {
    return await this.httpClient.get(environment.SERVER_URL + 'project/' + projectId).toPromise() as Project;
  }

  async updateProjectName(projectId: number, projectName: string): Promise<void> {
    await this.httpClient.patch(environment.SERVER_URL + 'project/' + projectId, {
      name: projectName
    }).toPromise();
  }

  async deleteProjectById(projectId: number): Promise<void> {
    await this.httpClient.delete(environment.SERVER_URL + 'project/' + projectId).toPromise();
  }

}





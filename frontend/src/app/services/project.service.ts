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

  async updateProjectDescription(projectId: number, projectDescription: string): Promise<void> {
    await this.httpClient.patch('http://localhost:3000/project/' + projectId, {
      description: projectDescription
    }).toPromise();
  }

  async getProjectById(projectId: number): Promise<Project> {
    return await this.httpClient.get('http://localhost:3000/project/' + projectId).toPromise() as Project;
  }

  async updateProjectName(projectId: number, projectName: string): Promise<void> {
    await this.httpClient.patch('http://localhost:3000/project/' + projectId, {
      name: projectName
    }).toPromise();
  }

  async deleteProjectById(projectId: number): Promise<void> {
    await this.httpClient.delete('http://localhost:3000/project/' + projectId).toPromise();
  }

  async updateProjectById(projectId: number, project: Project): Promise<void> {
    await this.httpClient.patch('http://localhost:4200/project/' + projectId, {
      name: project.name,
      description: project.description
    });
  }

}





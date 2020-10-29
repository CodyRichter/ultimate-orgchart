import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly httpClient:HttpClient) { }

  async createProject(project: any): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/project/create', project).toPromise();
  }
}



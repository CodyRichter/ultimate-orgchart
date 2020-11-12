import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly httpClient: HttpClient) { }

  async searchEmployee(query: any): Promise<any>{
    return await this.httpClient.get(`http://localhost:3000/search/employee/?query=${query}`).toPromise();
  }

  async searchProject(query: any): Promise<any>{
    return await this.httpClient.get(`http://localhost:3000/search/project/?query=${query}`).toPromise();
  }

  async searchGeneral(query: any): Promise<any>{
    return await this.httpClient.get(`http://localhost:3000/search/?query=${query}`).toPromise();
  }

}

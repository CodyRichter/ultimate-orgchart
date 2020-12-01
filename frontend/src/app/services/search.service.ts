import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly httpClient: HttpClient) { }

  async searchEmployee(query: any): Promise<any>{
    return await this.httpClient.get(environment.SERVER_URL + `search/employee/?query=${query}`).toPromise();
  }

  async searchProject(query: any): Promise<any>{
    return await this.httpClient.get(environment.SERVER_URL + `search/project/?query=${query}`).toPromise();
  }

  async searchGeneral(query: any): Promise<any>{
    return await this.httpClient.get(environment.SERVER_URL + `search/?query=${query}`).toPromise();
  }

}

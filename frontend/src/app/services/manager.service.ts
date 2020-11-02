import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private readonly httpClient: HttpClient) { }

  async createRequest(): Promise<any> {
    // TODO
  }

  async getIncomingRequests(managerId: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/all/to/' + managerId).toPromise();
  }

  async getOutgoingRequests(managerId: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/all/from/' + managerId).toPromise();
  }

  async getRequestById(id: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/' + id).toPromise();
  }

  async approveRequest(id: number): Promise<any> {
    return await this.httpClient.patch('http://localhost:3000/managerRequest/approve/' + id, null).toPromise();
  }

  async rejectRequest(id: number): Promise<any> {
    return await this.httpClient.patch('http://localhost:3000/managerRequest/reject/' + id, null).toPromise();
  }
}

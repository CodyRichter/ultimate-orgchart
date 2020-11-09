import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private readonly httpClient: HttpClient) { }

  async createRequest(data: ManagerRequest): Promise<ManagerRequest> {
    return await this.httpClient.post('http://localhost:3000/managerRequest/create', data).toPromise() as ManagerRequest;
  }

  async getIncomingRequests(managerId: number): Promise<ManagerRequest> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/all/to/' + managerId).toPromise() as ManagerRequest;
  }

  async getOutgoingRequests(managerId: number): Promise<ManagerRequest> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/all/from/' + managerId).toPromise() as ManagerRequest;
  }

  async getRequestById(id: number): Promise<ManagerRequest> {
    return await this.httpClient.get('http://localhost:3000/managerRequest/' + id).toPromise() as ManagerRequest;
  }

  async approveRequest(id: number): Promise<ManagerRequest> {
    return await this.httpClient.patch('http://localhost:3000/managerRequest/approve/' + id, null).toPromise() as ManagerRequest;
  }

  async rejectRequest(id: number): Promise<ManagerRequest> {
    return await this.httpClient.patch('http://localhost:3000/managerRequest/reject/' + id, null).toPromise() as ManagerRequest;
  }
}

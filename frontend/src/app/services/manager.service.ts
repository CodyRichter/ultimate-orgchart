import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private readonly httpClient: HttpClient) { }

  async createRequest(data: ManagerRequest): Promise<ManagerRequest> {
    return await this.httpClient.post(environment.SERVER_URL + 'managerRequest/create', data).toPromise() as ManagerRequest;
  }

  async getIncomingRequests(managerId: number): Promise<ManagerRequest> {
    return await this.httpClient.get(environment.SERVER_URL + 'managerRequest/all/to/' + managerId).toPromise() as ManagerRequest;
  }

  async getOutgoingRequests(managerId: number): Promise<ManagerRequest> {
    return await this.httpClient.get(environment.SERVER_URL + 'managerRequest/all/from/' + managerId).toPromise() as ManagerRequest;
  }

  async getRequestById(id: number): Promise<ManagerRequest> {
    return await this.httpClient.get(environment.SERVER_URL + 'managerRequest/' + id).toPromise() as ManagerRequest;
  }

  async approveRequest(id: number): Promise<ManagerRequest> {
    return await this.httpClient.patch(environment.SERVER_URL + 'managerRequest/approve/' + id, null).toPromise() as ManagerRequest;
  }

  async rejectRequest(id: number): Promise<ManagerRequest> {
    return await this.httpClient.patch(environment.SERVER_URL + 'managerRequest/reject/' + id, null).toPromise() as ManagerRequest;
  }

  async cancelRequest(id: number): Promise<ManagerRequest> {
    return await this.httpClient.patch(environment.SERVER_URL + 'managerRequest/cancel/' + id, null).toPromise() as ManagerRequest;
  }
}

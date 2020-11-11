import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Employee, EmployeeAuth } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private curSubtree: Employee;

  constructor(private readonly httpClient: HttpClient) {  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.httpClient.get('http://localhost:3000/employee/').toPromise() as Employee[];
  }

  async getAllManagers(): Promise<Employee[]> {
    return await this.httpClient.get('http://localhost:3000/employee/?isManager=true').toPromise() as Employee[];
  }

  getCurSubtree(): Employee {
    return this.curSubtree;
  }

  async initializeChart(): Promise<Employee> {
    const temp = await this.getManagersEmployees(undefined, 3) as any[];
    this.curSubtree = temp.find(employee => employee._id !== 404123456789404);
    return this.curSubtree;
  }

  // async increaseChartDepth(manager: any): Promise<any> {
  //   manager.manages = await this.getManagersEmployees(manager._id, 2);
  //   this.chartStack.push(manager);
  //   this.curSubtree = manager;
  //   console.log(this.chart);
  //   return this.chart;
  // }

  async goDownInChart(manager: Employee): Promise<Employee> {
    console.log('go down:', manager);
    manager.manages = await this.getManagersEmployees(manager._id, 1);
    console.log('manages now: ', manager.manages);
    this.curSubtree = manager;
    console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  async goUpInChart(employee: Employee, managerHeight = 2): Promise<Employee> {
    console.log('go up:', employee);
    this.curSubtree = await this.getManagers(employee._id, managerHeight, 2);
    console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  async getManagers(employeeId: number, managerHeight?: number, depth?: number): Promise<any> {
    console.log('get manager ', employeeId, ' height ', managerHeight, ' depth ', depth);
    let url = `http://localhost:3000/employee/getManagers/${employeeId}`;
    // ToDo: figure out string logic for case of one or the other
    if (depth) {
      url += `?managerHeight=${managerHeight}`;
    }
    if (depth) {
      url += `&depth=${depth}`;
    }
    return await this.httpClient.get(url).toPromise();
  }

  async getManagersEmployees(manager?: number, depth?: number): Promise<any> {
    console.log('get manages ', manager, ' depth ', depth);
    let url = 'http://localhost:3000/employee/getManages/';
    if (manager) {
      url += manager;
    }
    if (depth) {
      url += `?depth=${depth}`;
    }
    return await this.httpClient.get(url).toPromise();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    return await this.httpClient.get(`http://localhost:3000/employee/${employeeId}`).toPromise() as Employee;
  }

  async deleteEmployeeById(employeeId: number): Promise<Employee> {
    return await this.httpClient.delete(`http://localhost:3000/employee/${employeeId}`).toPromise() as Employee;
  }

  async updateEmployee(employee: Employee): Promise<Employee> {
    return await this.httpClient.patch(`http://localhost:3000/employee/${employee._id}`, employee).toPromise() as Employee;
  }

  async createEmployee(employee: Employee & EmployeeAuth): Promise<Employee> {
    return await this.httpClient.post('http://localhost:3000/employee/create', employee).toPromise() as Employee;
  }

  async createManyEmployees(employees: (Employee & EmployeeAuth)[]): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/employee/create', employees).toPromise() as Employee[];
  }

  async searchEmployee(query: any): Promise<Employee[]>{
    return await this.httpClient.get(`http://localhost:3000/employee/?${query}`).toPromise() as Employee[];
  }

  async uploadJSON(file: File): Promise<Employee[]> {
    const formData = new FormData();
    formData.append('file', file);
    return await this.httpClient.post('http://localhost:3000/employee/uploadJSON', formData).toPromise() as Employee[];
  }

  downloadJSON(): void {
     this.httpClient.get('http://localhost:3000/employee/JSON', {responseType: 'blob', observe: 'response'}).subscribe(
       response => {
        const blob = new Blob([response.body], {type: response.headers.get('Content-Type')});
        const fileName = response.headers.get('Content-Disposition').split('filename="')[1].split('"')[0];
        saveAs(blob, fileName);
       }, err => {
         throw err;
       }
     );
  }
}


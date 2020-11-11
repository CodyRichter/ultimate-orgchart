import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Employee, EmployeeAuth } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public curSubtree: Employee;
  public trees: Employee[];
  public curTreeIndex: number;

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
    this.trees = await this.getManagersEmployees(undefined, 2) as Employee[];
    this.curTreeIndex = 1;
    this.curSubtree = this.trees[this.curTreeIndex];
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
    this.curSubtree.highlight = true;
    this.trees[this.curTreeIndex] = this.curSubtree;
    console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  async goUpInChart(employee: Employee): Promise<Employee> {
    if (employee.manager) {
      const manager = (employee.manager as Employee);
      if (manager.manager) {
        const secondManagerId = manager.manager as number;
        this.curSubtree = await this.getEmployeeByIdWithDepth(secondManagerId, 2);
        const firstManager = this.curSubtree.manages.find((emp: Employee) => emp._id === manager._id) as Employee;
        const employeeIndex = firstManager.manages.findIndex((emp: Employee) => emp._id === employee._id);
        const temp = firstManager.manages[employeeIndex] as Employee;
        temp.highlight = true;
        firstManager.manages[employeeIndex] = firstManager.manages[0];
        firstManager.manages[0] = temp;
      } else {
        this.curSubtree = await this.getEmployeeByIdWithDepth(manager._id, 2);
        const employeeIndex = this.curSubtree.manages.findIndex((emp: Employee) => emp._id === employee._id);
        const temp = this.curSubtree.manages[employeeIndex] as Employee;
        temp.highlight = true;
        this.curSubtree.manages[employeeIndex] = this.curSubtree.manages[0];
        this.curSubtree.manages[0] = temp;
      }
    }
    this.trees[this.curTreeIndex] = this.curSubtree;
    // console.log('go up:', employee);
    // this.curSubtree = await this.getManagers(employee._id, managerHeight, 2);
    // console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  // async getManagers(employeeId: number, managerHeight?: number, depth?: number): Promise<any> {
  //   console.log('get manager ', employeeId, ' height ', managerHeight, ' depth ', depth);
  //   let url = `http://localhost:3000/employee/getManagers/${employeeId}`;
  //   // ToDo: figure out string logic for case of one or the other
  //   if (depth) {
  //     url += `?managerHeight=${managerHeight}`;
  //   }
  //   if (depth) {
  //     url += `&depth=${depth}`;
  //   }
  //   return await this.httpClient.get(url).toPromise();
  // }

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

  async getEmployeeByIdWithDepth(employeeId: number, depth?: number): Promise<any> {
    let url = `http://localhost:3000/employee/${employeeId}`;
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


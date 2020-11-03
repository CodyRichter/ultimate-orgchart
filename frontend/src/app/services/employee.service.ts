import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public chart: any;
  public chartStack: any[];
  public curSubtree: any;

  constructor(private readonly httpClient: HttpClient) {  }

  async getAllEmployees(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/employee/').toPromise();
  }

  async getAllManagers(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/employee/?isManager=true').toPromise();
  }

  async initializeChart(): Promise<any> {
    const temp = await this.getManagersEmployees(undefined, 3) as any[];
    this.chart = temp.find(employee => employee._id !== 404123456789404);
    console.log(this.chart);
    // this.chartStack.push(this.chart);
    // console.log(this.chartStack);
    this.curSubtree = this.chart;
    console.log(this.curSubtree);
    return this.chart;
  }

  async increaseChartDepth(manager: any): Promise<any> {
    manager.manages = await this.getManagersEmployees(manager._id, 2);
    // this.chartStack.push(manager);
    this.curSubtree = manager;
    console.log(this.chart);
    return this.chart;
  }

  async getManagersEmployees(manager?: number, depth?: number): Promise<any> {
    let url = 'http://localhost:3000/employee/getManages/';
    if (manager) {
      url += manager;
    }
    if (depth) {
      url += `?depth=${depth}`;
    }
    console.log(url);

    return await this.httpClient.get(url).toPromise();
  }

  async getEmployeeById(employeeId: number): Promise<any> {
    return await this.httpClient.get(`http://localhost:3000/employee/${employeeId}`).toPromise();
  }

  async deleteEmployeeById(employeeId: number): Promise<any> {
    return await this.httpClient.delete(`http://localhost:3000/employee/${employeeId}`).toPromise();
  }

  async updateEmployee(employee: any): Promise<any> {
    return await this.httpClient.patch(`http://localhost:3000/employee/${employee.employeeId}`, employee).toPromise();
  }

  async createEmployee(employee: any): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/employee/create', employee).toPromise();
  }

  async createManyEmployees(employees: any[]): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/employee/create', employees).toPromise();
  }

  async searchEmployee(query:any):Promise<any>{
    //const query = queryname + "=" + searchquery
    return await this.httpClient.get(`http://localhost:3000/employee/?${query}`).toPromise();
  }

  async uploadJSON(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    return await this.httpClient.post('http://localhost:3000/employee/uploadJSON', formData).toPromise()
  }

  downloadJSON(): any {
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


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private readonly httpClient: HttpClient) { }

  async getAllEmployees(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/employee/all').toPromise();
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

  async uploadJSON(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    return await this.httpClient.post('http://localhost:3000/employee/uploadJSON', formData).toPromise()
  }

  downloadJSON(): any {
     this.httpClient.get('http://localhost:3000/employee/JSON', {responseType: 'blob', observe: 'response',}).subscribe(
       response => {
        const blob = new Blob([response], {type: 'application/json'});
        const fileName = response.headers.get('Content-Disposition').split('filename="')[1].split('"')[0];
        saveAs(blob, fileName);
       }, err => {
         throw err;
       }
     );
  }
}

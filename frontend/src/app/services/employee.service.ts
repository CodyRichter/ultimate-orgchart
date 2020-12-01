import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeAuth } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public curSubtree: Employee;
  public trees: {root: Employee, curNav: Employee, deletable: boolean, name: string}[] = [];
  public curTreeIndex: number;

  constructor(private readonly httpClient: HttpClient) {  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.httpClient.get(environment.SERVER_URL + 'employee/').toPromise() as Employee[];
  }

  async getAllManagers(): Promise<Employee[]> {
    return await this.httpClient.get(environment.SERVER_URL + 'employee/?isManager=true').toPromise() as Employee[];
  }

  getCurSubtree(): Employee {
    return this.curSubtree;
  }

  async initializeChart(): Promise<Employee> {
    const temp = await this.getManagersEmployees(undefined, 2) as Employee[];
    temp.forEach(emp => this.trees.push({root: emp, curNav: emp, deletable: false, 
      name: 'Tree root: ' + emp.firstName + ' ' + emp.lastName}));
    this.curTreeIndex = 0;
    this.curSubtree = this.trees[this.curTreeIndex].curNav;
    return this.curSubtree;
  }

  navigateToRightTree(): void {
    this.curTreeIndex += 1;
    this.curSubtree = this.trees[this.curTreeIndex].curNav;
  }

  restartCurrentRoot(): void {
    this.trees[this.curTreeIndex].curNav = this.trees[this.curTreeIndex].root;
    this.curSubtree = this.trees[this.curTreeIndex].curNav;
  }

  navigateToLeftTree(): void {
    this.curTreeIndex -= 1;
    this.curSubtree = this.trees[this.curTreeIndex].curNav;
  }

  // async increaseChartDepth(manager: any): Promise<any> {
  //   manager.manages = await this.getManagersEmployees(manager._id, 2);
  //   this.chartStack.push(manager);
  //   this.curSubtree = manager;
  //   // console.log(this.chart);
  //   return this.chart;
  // }

  pushNewRoot(root: {curNav: Employee, root: Employee, name: string, deletable: boolean}) {
    this.trees.push(root);
    this.curTreeIndex = this.trees.length - 1;
  }

  async goDownInChart(manager: Employee, newRoot: boolean  = false): Promise<Employee> {
    console.log('go down:', manager);
    manager.manages = await this.getManagersEmployees(manager._id, 1);
    console.log('manages now: ', manager.manages);
    if (newRoot) {
      this.trees.push({root: manager, curNav: manager, deletable: true,
        name: 'Employee Search: ' + manager.firstName + ' ' + manager.lastName});
      this.curTreeIndex = this.trees.length - 1;
    } else {
      this.trees[this.curTreeIndex].curNav = manager;
    }
    this.curSubtree = this.trees[this.curTreeIndex].curNav;
    this.curSubtree.highlight = true;
    this.trees[this.curTreeIndex].curNav = this.curSubtree;
    console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  async goUpInChart(employee: Employee, newRoot: boolean  = false): Promise<Employee> {
    if (employee.manager) {
      const manager = (employee.manager as Employee);
      if (manager.manager) {
        const secondManagerId = manager.manager as number;
        const tempTree = await this.getEmployeeByIdWithDepth(secondManagerId, 2);
        if (newRoot) {
          this.trees.push({root: tempTree, curNav: tempTree, deletable: true,
            name: 'Employee Search: ' + employee.firstName + ' ' + employee.lastName});
          this.curTreeIndex = this.trees.length - 1;
        } else {
          this.trees[this.curTreeIndex].curNav = tempTree;
        }
        this.curSubtree = this.trees[this.curTreeIndex].curNav;
        const firstManager = this.curSubtree.manages.find((emp: Employee) => emp._id === manager._id) as Employee;
        const employeeIndex = firstManager.manages.findIndex((emp: Employee) => emp._id === employee._id);
        const temp = firstManager.manages[employeeIndex] as Employee;
        temp.highlight = true;
        firstManager.manages[employeeIndex] = firstManager.manages[0];
        firstManager.manages[0] = temp;
      } else {
        const tempTree = await this.getEmployeeByIdWithDepth(manager._id, 2);
        if (newRoot) {
          this.trees.push({root: tempTree, curNav: tempTree, deletable: true,
            name: 'Employee Search: ' + employee.firstName + ' ' + employee.lastName});
          this.curTreeIndex = this.trees.length - 1;
        } else {
          this.trees[this.curTreeIndex].curNav = tempTree;
        }
        this.curSubtree = this.trees[this.curTreeIndex].curNav;
        const employeeIndex = this.curSubtree.manages.findIndex((emp: Employee) => emp._id === employee._id);
        const temp = this.curSubtree.manages[employeeIndex] as Employee;
        temp.highlight = true;
        this.curSubtree.manages[employeeIndex] = this.curSubtree.manages[0];
        this.curSubtree.manages[0] = temp;
      }
    }
    // const tempTree = await this.getEmployeeByIdWithDepth(employee._id, 2);
    // if (newRoot) {
    //   this.trees.push({root: tempTree, curNav: tempTree, deletable: true, 
    //     name: 'Employee Search: ' + employee.firstName + ' ' + employee.lastName});
    //   this.curTreeIndex = this.trees.length - 1;
    // } else {
    //   this.trees[this.curTreeIndex].curNav = tempTree;
    // }
    // this.curSubtree = this.trees[this.curTreeIndex].curNav;
    // console.log('go up:', employee);
    // this.curSubtree = await this.getManagers(employee._id, managerHeight, 2);
    // // console.log('subtree', this.curSubtree);
    return this.curSubtree;
  }

  // async getManagers(employeeId: number, managerHeight?: number, depth?: number): Promise<any> {
  //   // console.log('get manager ', employeeId, ' height ', managerHeight, ' depth ', depth);
  //   let url = environment.SERVER_URL + `employee/getManagers/${employeeId}`;
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
    // console.log('get manages ', manager, ' depth ', depth);
    let url = environment.SERVER_URL + 'employee/getManages/';
    if (manager) {
      url += manager;
    }
    if (depth) {
      url += `?depth=${depth}`;
    }
    return await this.httpClient.get(url).toPromise();
  }

  async getEmployeeByIdWithDepth(employeeId: number, depth?: number): Promise<any> {
    let url = environment.SERVER_URL + `employee/${employeeId}`;
    if (depth) {
      url += `?depth=${depth}`;
    }
    return await this.httpClient.get(url).toPromise();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    return await this.httpClient.get(environment.SERVER_URL + `employee/${employeeId}`).toPromise() as Employee;
  }

  async deleteEmployeeById(employeeId: number): Promise<Employee> {
    return await this.httpClient.delete(environment.SERVER_URL + `employee/${employeeId}`).toPromise() as Employee;
  }

  async updateEmployee(employee: Employee): Promise<Employee> {
    return await this.httpClient.patch(environment.SERVER_URL + `employee/${employee._id}`, employee).toPromise() as Employee;
  }

  async createEmployee(employee: Employee & EmployeeAuth): Promise<Employee> {
    return await this.httpClient.post(environment.SERVER_URL + 'employee/create', employee).toPromise() as Employee;
  }

  async createManyEmployees(employees: (Employee & EmployeeAuth)[]): Promise<any> {
    return await this.httpClient.post(environment.SERVER_URL + 'employee/create', employees).toPromise() as Employee[];
  }

  async uploadJSON(file: File): Promise<Employee[]> {
    const formData = new FormData();
    formData.append('file', file);
    return await this.httpClient.post(environment.SERVER_URL + 'employee/uploadJSON', formData).toPromise() as Employee[];
  }

  downloadJSON(): void {
     this.httpClient.get(environment.SERVER_URL + 'employee/JSON', {responseType: 'blob', observe: 'response'}).subscribe(
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


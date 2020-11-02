import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router,
              private readonly authService: AuthService,
              public readonly employeeService: EmployeeService,
              private dialog: MatDialog, private readonly projectService: ProjectService) {

    this.employeeService.initializeChart();

}

  selectNode(nodeData: {name: string, title: string}): void {
    alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
  }

  async logout(): Promise<void> {
    this.authService.logout();
    this.router.navigateByUrl('/login').then();
  }

  async getUser(): Promise<void> {
    console.log(this.authService.profile);
  }

  async initializeChart(): Promise<void> {
    await this.employeeService.initializeChart();
  }

  async updateGraph(): Promise<void> {
    await this.employeeService.goDownInChart(this.employeeService.chart.manages[0].manages[2]);
  }

  async getAllEmployees(): Promise<void> {
    console.log(await this.employeeService.getAllEmployees());
  }

  async getSingleEmployee(): Promise<void> {
    console.log(await this.employeeService.getEmployeeById(2501));
  }

  async deleteEmployee(): Promise<void> {
    console.log(await this.employeeService.deleteEmployeeById(2501));
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async updateEmployee(): Promise<void> {
    const newEmployee = {
      isManager: true,
      isAdmin: true,
      firstName: 'Some',
      lastName: 'Person',
      companyId: 1,
      positionTitle: 'Senior bug finder',
      companyName: 'Cyclone Aviation',
      employeeId: 2501,
      managerId: null,
      email: 'testemail@email.com',
      password: 'password',
      startDate: new Date(),
    };
    console.log(await this.employeeService.updateEmployee(newEmployee));
  }

  async createEmployee(): Promise<void> {
    const newEmployee = {
      isManager: true,
      isAdmin: true,
      firstName: 'Testing',
      lastName: 'Dummy',
      companyId: 1,
      positionTitle: 'Senior bug finder',
      companyName: 'Cyclone Aviation',
      employeeId: 2501,
      managerId: null,
      email: 'testemail@email.com',
      password: 'password',
      startDate: new Date(),
    };
    console.log(await this.employeeService.createEmployee(newEmployee));
  }

  async createProject(): Promise<void> {
    const newProject = 
      {
        name: "Example Project",
        description: "This is dummy text to showcase project description",
        employees: [{role: "write code", employee: {_id: 2}}, {role: "write bugs", employee: {_id: 3}}],
        manager: {role: "manage stuff", employee: {_id: 1}}
    };
    console.log(await this.projectService.createProject(newProject));
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialog);
  }

}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
})
export class SettingsDialog {}

@Component({
  selector: 'search-dialog',
  templateUrl: 'search-dialog.html',
})
export class SearchDialog {}
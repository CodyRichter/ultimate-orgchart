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
    //this.myFunction();
    this.dialog.open(SearchDialog);
    this.myFunction();
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

  async numberOfResults():Promise<void>{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    var input = (await this.employeeService.searchEmployee(currentVal))
    var peopleHeader = (<HTMLInputElement>document.getElementById("people"))
    let count = 0;
    for(var i = 0; i<input.length;++i){ 
      count=count+1;
    }
    let externalHTML = `<div style="margin-top:20px;"><h3>`
    let extremeHTML = `</h3></div>`
    let peopleHeaderText = "People: " + count + " Results"
    peopleHeader.innerHTML = externalHTML + peopleHeaderText + extremeHTML;
  }

  async myFunction():Promise<void>{
    this.numberOfResults();
    var nodeData = []; //create an array
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value; //value of search query
    var dialoginput = (<HTMLInputElement>document.getElementById("dialog"))
    var input = (await this.employeeService.searchEmployee(currentVal)) //filtered array
    for(var i = 0; i<input.length;++i){ 
        nodeData.push(input[i]); //push filtered results into nodeData array
        console.log(nodeData);
    let externalHTML = `<mat-list-item id="listItem"><div style="display: inline-block; padding-right:10px;"><img src="assets/icons/default-avatar.png" alt="" style="width: 40px"></div>
    <div style="font-size: medium; display: inline-block; padding-right:10px;">
        <strong>`;
    let extremeHTML = `</strong>
        </div></div>
        <button *ngIf="node.manages.length > 0" mat-stroked-button class="button" color="warn" mat-dialog-close (click)="onNavigateClick(node)">Navigate</button></mat-list-item>`;
    let employeeDetails = input[i].firstName + " " + input[i].lastName + "<br>" + input[i].positionTitle +  "<br>";
    dialoginput.innerHTML += externalHTML + employeeDetails + extremeHTML + "<br>" + "<br>";
    }

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
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

  async logout(): Promise<void> {
    this.authService.logout();
    this.router.navigateByUrl('/login').then();
  }

  async initializeChart(): Promise<void> {
    await this.employeeService.initializeChart();
  }

  openDialog(): void {
    this.dialog.open(SearchDialog);
    this.myFunction();
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialog);
  }

  async numberOfResults(): Promise<void>{
    const currentVal = ( document.getElementById('mySearch') as HTMLInputElement).value;
    const input = await this.employeeService.searchEmployee(currentVal);
    const peopleHeader = ( document.getElementById('people') as HTMLInputElement);
    const count = input.length;
    const externalHTML = `<div style="margin-top:20px;"><h3>`;
    const extremeHTML = `</h3></div>`;
    const peopleHeaderText = 'People: ' + count + ' Results'
    peopleHeader.innerHTML = externalHTML + peopleHeaderText + extremeHTML;
  }

  async myFunction(): Promise<void>{
    this.numberOfResults();
    const nodeData = []; // create an array
    const currentVal = (document.getElementById('mySearch') as HTMLInputElement).value; // value of search query
    const dialoginput =  document.getElementById('dialog') as HTMLInputElement;
    const input = await this.employeeService.searchEmployee(currentVal); // filtered array
    for (const employee of input) {
        nodeData.push(employee); // push filtered results into nodeData array
        console.log(nodeData);
    const externalHTML = `<mat-list-item id="listItem"><div style="display: inline-block; padding-right:10px;"><img src="assets/icons/default-avatar.png" alt="" style="width: 40px"></div>
    <div style="font-size: medium; display: inline-block; padding-right:10px;">
        <strong>`;
    const extremeHTML = `</strong>
        </div></div>
        <button *ngIf="node.manages.length > 0" mat-stroked-button class="button" color="warn" mat-dialog-close (click)="onNavigateClick(node)">Navigate</button></mat-list-item>`;
    const employeeDetails = employee.firstName + ' ' + employee.lastName + '<br>' + employee.positionTitle +  '<br>';
        dialoginput.innerHTML += externalHTML + employeeDetails + extremeHTML + '<br>' + '<br>';
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

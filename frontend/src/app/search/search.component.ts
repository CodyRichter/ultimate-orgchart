import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  classList: any;
  textContent: any;

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  searchResult():any{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    return currentVal;
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

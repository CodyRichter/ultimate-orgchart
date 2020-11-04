import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Node } from 'src/app/modules/orgchart/shared/models/node.model';
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

  isAdmin(): boolean {
    return this.authService.profile.isAdmin;
  }

  isManager(): boolean {
    return this.authService.profile.isManager;
  }

  async getUser(): Promise<void> {
    console.log(this.authService.profile);
  }

  searchResult():any{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    return currentVal;
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDividerModule} from '@angular/material/divider';
import { Employee } from 'src/app/models';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: Employee[];

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.searchResults = data.searchResult;
      console.log(this.searchResults);
    }

  ngOnInit(): void {
  }

  searchResult():any{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    return currentVal;
  }

}

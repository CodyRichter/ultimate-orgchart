import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDividerModule} from '@angular/material/divider';
import { Employee } from 'src/app/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: any;
  searchQuery: any;

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.searchResults = data.searchResult;
      console.log(data.searchResult);
    }

  ngOnInit(): void {
    this.searchResult();
  }

  searchResult():any{
    this.searchQuery = (<HTMLInputElement>document.getElementById("mySearch")).value;
    return this.searchQuery;
  }

  async nextEmployee() {
    const nextUrl = this.searchResults.nextEmployeeURL;
    const result = await this.httpClient.get(`http://${nextUrl}`).toPromise() as any;
    this.searchResults.nextEmployeeURL = result.nextEmployeeURL;
    this.searchResults.prevEmployeeURL = result.prevEmployeeURL;
    this.searchResults.employees = result.employees;
  }

  async prevEmployee() {
    const prevUrl = this.searchResults.prevEmployeeURL;
    const result = await this.httpClient.get(`http://${prevUrl}`).toPromise() as any;
    this.searchResults.nextEmployeeURL = result.nextEmployeeURL;
    this.searchResults.prevEmployeeURL = result.prevEmployeeURL;
    this.searchResults.employees = result.employees;
  }

  async nextProject() {
    const nextUrl = this.searchResults.nextProjectURL;
    const result = await this.httpClient.get(`http://${nextUrl}`).toPromise() as any;
    this.searchResults.nextProjectURL = result.nextProjectURL;
    this.searchResults.prevProjectURL = result.prevProjectURL;
    this.searchResults.projects = result.projects;
  }

  async prevProject() {
    const prevUrl = this.searchResults.prevProjectURL;
    const result = await this.httpClient.get(`http://${prevUrl}`).toPromise() as any;
    this.searchResults.nextProjectURL = result.nextProjectURL;
    this.searchResults.prevProjectURL = result.prevProjectURL;
    this.searchResults.projects = result.projects;
  }
}

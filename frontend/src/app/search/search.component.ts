import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

  async getOneEmployee(empID:any): Promise<void> {
    console.log(await this.employeeService.getEmployeeById(empID));
  }

  async myFunction():Promise<void>{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    var input = (await this.employeeService.searchEmployee(currentVal));
    console.log(input[0].positionTitle);
    console.log(input);
    return input;
  }

}

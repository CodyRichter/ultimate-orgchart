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

  async myFunction():Promise<void>{
    var currentVal = (<HTMLInputElement>document.getElementById("mySearch")).value;
    var dialoginput = (<HTMLInputElement>document.getElementById("dialog"))
    var input = (await this.employeeService.searchEmployee(currentVal));
    for(var i = 0; i<input.length;++i){
      dialoginput.innerHTML = `<a mat-list-item><span mat-line>${input[i].firstName} ${input[i].lastName}<br></span></a>`;

    }
    console.log(input);
    return input;
  }

  searchedEmp():void{
    console.log("hi");
  }

}

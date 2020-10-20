import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private readonly authService: AuthService,
              private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.authService.profile.isAdmin;
  }

  isManager(): boolean {
    return this.authService.profile.isManager;
  }

}

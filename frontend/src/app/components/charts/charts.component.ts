import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ds = {
    id: '1',
    name: 'Adrienne Hawkins',
    title: 'CEO',
    children: [
      { id: '2', name: 'Bernadine Richard', title: 'Engineering Manager' },
      {
        id: '3',
        name: 'Cleveland Jensen',
        title: 'Engineering Manager',
        children: [
          { id: '4', name: 'Thanh Page', title: 'Senior Software Engineer' },
          {
            id: '5',
            name: 'Patti Robles',
            title: 'Engineering Manager',
            children: [
              { id: '6', name: 'Williams Morales', title: 'Software Engineer II' },
              { id: '7', name: 'Dewey Mckay', title: 'Software Engineer II' },
              { id: '8', name: 'Jayne York', title: 'Software Engineer II' },
              { id: '9', name: 'Randi Vang', title: 'Software Engineer II' },
              { id: '10', name: 'Maryanne Bell', title: 'Software Engineer II' },
              { id: '11', name: 'Adolph Mccarty', title: 'Software Engineer II' }
            ]
          },
          { id: '12', name: 'Oren Marsh', title: 'Software Architect' },
          { id: '13', name: 'Quinton Travis', title: 'Software Architect' },
          { id: '14', name: 'Jessie Willis', title: 'Tech Lead' },
          { id: '15', name: 'Josue Stuart', title: 'Senior Software Engineer' }
        ]
      },
      { id: '16', name: 'Adan Larsen', title: 'Software Engineer I' },
      { id: '17', name: 'Raleigh Robbins', title: 'Software Engineer I' },
      { id: '18', name: 'Josue Stuart', title: 'Tech Lead' },
      { id: '19', name: 'Thanh Page', title: 'Tech Lead' },
      { id: '20', name: 'Jerald Cuevas', title: 'Software Architect' },
      { id: '21', name: 'Denis Matthews', title: 'Software Engineer II' }
    ]
  };

  ngOnInit(): void {
  }

  constructor(private router: Router,
    public dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService) {
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

  async getAllEmployees(): Promise<void> {
    console.log(await this.employeeService.getAllEmployees());
  }

  async getSingleEmployee(): Promise<void> {
    console.log(await this.employeeService.getEmployeeById(2501));
  }

  async deleteEmployee(): Promise<void> {
    console.log(await this.employeeService.deleteEmployeeById(2501));
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

  async downloadJSON(): Promise<void> {
    await this.employeeService.downloadJSON();
  }

  openJSONUploadDialog(): void {
    const dialogRef = this.dialog.open(JSONUploadDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'json-upload-dialog',
  templateUrl: 'json-upload-dialog.html',
})
export class JSONUploadDialog {}

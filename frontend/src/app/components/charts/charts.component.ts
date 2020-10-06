import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router, private httpClient: HttpClient, public dialog: MatDialog) {
  }

  logout(): void {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login').then();
  }

  async getUser(): Promise<void> {
    console.log(await this.httpClient.get('http://localhost:3000/auth/profile').toPromise());
  }

  async getEmployees(): Promise<void> {
    console.log(await this.httpClient.get('http://localhost:3000/employee/all').toPromise());
  }

  openJSONUploadDialog() {
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

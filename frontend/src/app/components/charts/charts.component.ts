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

  ds = {
    id: '1',
    name: 'Lao Lao',
    title: 'general manager',
    children: [
      { id: '2', name: 'Bo Miao', title: 'department manager' },
      {
        id: '3',
        name: 'Su Miao',
        title: 'department manager',
        cssClass: 'ngx-org-head',
        children: [
          { id: '4', name: 'Tie Hua', title: 'senior engineer' },
          {
            id: '5',
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              { id: '6', name: 'Dan Zai', title: 'engineer' },
              { id: '7', name: 'Dan Dan', title: 'engineer' },
              { id: '8', name: 'Xiang Xiang', title: 'engineer' },
              { id: '9', name: 'Ke Xin', title: 'engineer' },
              { id: '10', name: 'Xiao Dan', title: 'engineer' },
              { id: '11', name: 'Dan Dan Zai', title: 'engineer' }
            ]
          },
          { id: '12', name: 'Pang Pang', title: 'senior engineer' },
          { id: '13', name: 'Er Pang', title: 'senior engineer' },
          { id: '14', name: 'San Pang', title: 'senior engineer' },
          { id: '15', name: 'Si Pang', title: 'senior engineer' }
        ]
      },
      { id: '16', name: 'Hong Miao', title: 'department manager' },
      { id: '17', name: 'Chun Miao', title: 'department manager' },
      { id: '18', name: 'Yu Li', title: 'department manager' },
      { id: '19', name: 'Yu Jie', title: 'department manager' },
      { id: '20', name: 'Yu Wei', title: 'department manager' },
      { id: '21', name: 'Yu Tie', title: 'department manager' }
    ]
  };

  selectNode(nodeData: {name: string, title: string}) {
    alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
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

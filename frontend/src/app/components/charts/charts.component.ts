import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  logout(): void {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login').then();
  }

  async get(): Promise<void> {
    console.log(await this.httpClient.get('http://localhost:3000/auth/profile').toPromise());
  }

}

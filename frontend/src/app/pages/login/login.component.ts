import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  hide: any;

  constructor(private elementRef: ElementRef, private router: Router, private httpClient: HttpClient) {
    this.hide = true;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F9F9F9';
  }

  login(): void {
    this.httpClient.post('http://localhost:3000/auth/signin', {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }).toPromise()
      .then()
      .catch();
  }

}

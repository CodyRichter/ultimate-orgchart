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
  controller: FormControl;

  constructor(private elementRef: ElementRef, private router: Router, private httpClient: HttpClient) {
    this.hide = true;
    this.controller = new FormControl();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F9F9F9';
  }

  login(): void {
    this.httpClient.post('http://localhost:3000/auth/signin', {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }).toPromise()
      .then(token => this.tokenHandler(token))
      .catch(error => this.errorHandler(error));
  }

  tokenHandler(token): void {
    localStorage.setItem('id_token', token.accessToken);
    this.router.navigateByUrl('/charts').then();
  }

  errorHandler(error): void{
    if (error.status === 401) {
      this.controller.setErrors({incorrect: true});
    }
  }

}

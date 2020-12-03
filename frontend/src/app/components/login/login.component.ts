import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  hide: any;
  controller: FormControl;

  constructor(private readonly elementRef: ElementRef,
              private readonly router: Router,
              private readonly authService: AuthService) {
    this.hide = true;
    this.controller = new FormControl();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F9F9F9';
  }

  async login(): Promise<void> {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
      await this.authService.login(email, password);
      await this.router.navigateByUrl('/charts');
      if (email === 'admin@admin.com' && password === 'password') {
        console.log('change login');
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  errorHandler(error): void{
    if (error.status === 401) {
      this.controller.setErrors({incorrect: true});
    }
  }

}

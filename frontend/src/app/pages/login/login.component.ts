import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  hide: any;

  constructor(private elementRef: ElementRef, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F9F9F9';
  }

  authenticate(): boolean {
    const emailInput: any = document.getElementById('email') as HTMLInputElement;
    const passwordInput: any = document.getElementById('password') as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === 'admin' && password === 'admin') {
      this.router.navigateByUrl('/charts').then();
    }
    return false;
  }

}

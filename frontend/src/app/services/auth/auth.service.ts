/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  private authToken: string;
  public profile: Employee;

  public async login(email: string, password: string): Promise<Employee> {
    const response = await this.httpClient.post(environment.SERVER_URL + 'auth/signin', {email, password}).toPromise() as any;
    this.authToken = response.accessToken;
    localStorage.setItem('id_token', this.authToken);
    return await this.getProfile();
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    this.authToken = undefined;
    this.profile = undefined;
  }

  public getAuthToken(): string {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('id_token');
    }
    return this.authToken;
  }

  public async getProfile(): Promise<Employee> {
    this.getAuthToken();
    this.profile = await this.httpClient.get(environment.SERVER_URL + 'auth/profile').toPromise() as Employee;
    return this.profile;
  }
}
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  private authToken: string;
  private refreshToken: string;
  private authTokenExpires: Date;
  private refreshTokenExpires: Date;
  public profile: Employee;

  public async login(email: string, password: string): Promise<Employee> {
    const response = await this.httpClient.post(environment.SERVER_URL + 'auth/signin', {email, password}).toPromise() as any;
    this.authToken = response.accessToken;
    this.refreshToken = response.refreshToken;
    this.authTokenExpires = new Date(response.accessTokenExpires);
    this.refreshTokenExpires = new Date(response.refreshTokenExpires);

    localStorage.setItem('auth_token', this.authToken);
    localStorage.setItem('refresh_token', this.refreshToken);
    localStorage.setItem('auth_token_expires', response.accessTokenExpires);
    localStorage.setItem('refresh_token_expires', response.refreshTokenExpires);

    return await this.getProfile();
  }

  public logout(): void {
    localStorage.removeItem('auth_token');
    this.authToken = undefined;
    this.profile = undefined;
  }

  public getAuthToken(): string {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('auth_token');
    }
    return this.authToken;
  }

  public refreshAccessToken(): string{
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('refresh_token');
    }
    return this.refreshToken;
  }


  public isRefreshTokenExpired(): boolean{
    if (!this.refreshTokenExpires) {
      this.refreshTokenExpires = new Date(localStorage.getItem('refresh_token_expires'));
    }
    return new Date().getTime() >= this.refreshTokenExpires.getTime();
  }

  public saveAccessToken(authResponse: any): void {
    localStorage.setItem('auth_token', authResponse.accessToken);
    localStorage.setItem('auth_token_expires', authResponse.accessTokenExpires);
    this.authToken = authResponse.accessToken;
    this.authTokenExpires = new Date(authResponse.accessTokenExpires);
  }

  public isAccessTokenExpired(): boolean{
    if (!this.authTokenExpires) {
      this.authTokenExpires = new Date(localStorage.getItem('auth_token_expires'));
    }
    return new Date().getTime() >= this.authTokenExpires.getTime();
  }

  public async getProfile(): Promise<Employee> {
    this.getAuthToken();
    this.profile = await this.httpClient.get(environment.SERVER_URL + 'auth/profile').toPromise() as Employee;
    return this.profile;
  }
}

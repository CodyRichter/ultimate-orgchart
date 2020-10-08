import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  private authToken: string;
  profile: any;

  public async login(email: string, password: string): Promise<any> {
    const response = await this.httpClient.post('http://localhost:3000/auth/signin', {email, password}).toPromise() as any;
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

  private async getProfile(): Promise<any> {
    this.getAuthToken();
    this.profile = await this.httpClient.get('http://localhost:3000/auth/profile').toPromise();
    return this.profile;
  }
}
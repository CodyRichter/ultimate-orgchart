import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService, private readonly httpClient: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('sigin') !== -1) {
          console.log('getting new token');
          return next.handle(request);
        }

        const accessExpired = this.authService.isAccessTokenExpired();
        const refreshExpired = this.authService.isRefreshTokenExpired();

        if (accessExpired && refreshExpired) {
          console.log('both expired - log out');
          return next.handle(request);
        }
        if (accessExpired && !refreshExpired) {
          console.log('access token expired');
          if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                const httpHeaders: HttpHeaders = new HttpHeaders({
                  Authorization: 'Bearer ' + this.authService.refreshAccessToken()
              });
              console.log('refreshing');
                return this.httpClient.post('http://localhost:3000/auth/refresh', {}, {headers: httpHeaders}).pipe(
                    switchMap((authResponse: any) => {
                      console.log(authResponse);
                        this.authService.saveAccessToken(authResponse);
                        this.refreshTokenInProgress = false;
                        this.refreshTokenSubject.next(authResponse.refreshToken);
                        return next.handle(this.injectToken(request, authResponse.refreshToken));
                    }),
                );
            } else {
              return this.refreshTokenSubject.pipe(
                    filter(result => result !== null),
                    take(1),
                    switchMap((res) => {
                        console.log(res);
                        return next.handle(this.injectToken(request, res));
                    })
                );
            }
        }

        if (!accessExpired) {
             console.log('not expired');
            return next.handle(this.injectToken(request, this.authService.getAuthToken()));
        }
    }

    injectToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
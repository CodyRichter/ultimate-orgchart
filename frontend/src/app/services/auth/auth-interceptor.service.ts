import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService, private readonly httpClient: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessExpired = this.authService.isAccessTokenExpired();
        const refreshExpired = this.authService.isRefreshTokenExpired();

        if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('signin') !== -1) {
          console.log('getting new token');
          return next.handle(request);
        }

        else if (accessExpired && refreshExpired) {
          console.log('both expired - log out');
          return next.handle(request);
        }
        else if (accessExpired && !refreshExpired) {
          console.log('access token expired');
          if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                const httpHeaders: HttpHeaders = new HttpHeaders({
                  Authorization: 'Bearer ' + this.authService.refreshAccessToken()
              });
              console.log('refreshing');
                return this.httpClient.post(environment.SERVER_URL + 'auth/refresh', {}, {headers: httpHeaders}).pipe(
                    switchMap((authResponse: any) => {
                      console.log(authResponse);
                        this.authService.saveAccessToken(authResponse);
                        this.refreshTokenSubject.next(authResponse.refreshToken);
                        this.refreshTokenInProgress = false;
                        return next.handle(this.injectToken(request, authResponse.accessToken));
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

        else if (!accessExpired) {
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
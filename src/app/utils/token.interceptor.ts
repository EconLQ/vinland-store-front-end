import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401 && this.authService.isLoggedIn()) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }
  /**
   * Handles 401 Unauthorized errors by attempting to refresh the access token.
   * If the refresh is successful, it retries the original HTTP request with the new token.
   * If the refresh fails, it signs the user out and navigates to the sign-in page.
   * @param req - The original HTTP request that resulted in a 401 error.
   * @param next - The HTTP handler to forward the request to.
   * @returns An observable of the HTTP event stream after retrying with a new token,
   * or an error after signing out.
   */
  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        const newToken = this.authService.getAccessToken();
        return next.handle(
          req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
        );
      }),
      catchError(() => {
        this.authService.signOut();
        this.router.navigate(['/sign-in']);
        return throwError(() => new HttpErrorResponse({ status: 401 }));
      })
    );
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../common/login-response';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserSignUpRequest } from '../../common/user-sign-up-request';
import { log } from 'console';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  private authBaseUrl = `${environment.apiBaseUrl}/auth`;
  private headersOptions = {
    withCredentials: true, // include cookies with the request
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(private httpClient: HttpClient, private rotuer: Router) {}

  public login(loginData: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    const payload = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password);
    return this.httpClient.post<LoginResponse>(
      `${this.authBaseUrl}/sign-in`,
      payload,
      this.headersOptions
    );
  }
  public register(signUpRequest: UserSignUpRequest): Observable<void> {
    const payload = new HttpParams()
      .set('username', signUpRequest.username)
      .set('firstName', signUpRequest.firstName)
      .set('lastName', signUpRequest.lastName)
      .set('email', signUpRequest.email)
      .set('password', signUpRequest.password);

    return this.httpClient.post<void>(
      `${this.authBaseUrl}/sign-up`,
      payload,
      this.headersOptions
    );
  }
  public signOut() {
    return this.httpClient
      .post<string>(`${this.authBaseUrl}/logout`, null, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.isLoggedIn = false;
          this.rotuer.navigateByUrl('/sign-in');
        },
        (error) => {
          console.log('Error logging out: ', error);
        }
      );
  }
}

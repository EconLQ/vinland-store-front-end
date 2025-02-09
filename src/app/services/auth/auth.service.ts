import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../common/login-response';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authBaseUrl = `${environment.apiBaseUrl}/auth`;
  private headersOptions = {
    withCredentials: true, // include cookies with the request
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(private httpClient: HttpClient, private rotuer: Router) {}

  public login(loginData: { email: string; password: string }) {
    const payload = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password);
    return this.httpClient
      .post<LoginResponse>(
        `${this.authBaseUrl}/sign-in`,
        payload,
        this.headersOptions
      )
      .subscribe(
        (response: LoginResponse) => {
          // this.tokenService.saveToken(response['access_token']);
          this.rotuer.navigateByUrl('/');
        }
        // (error) => {
        //   console.log('Error logging in: ', error);
        //   console.log('Error status code: ', error.code);
        // }
      );
  }
  public register(signUpForm: NgForm) {
    return this.httpClient
      .post<void>(
        `${this.authBaseUrl}/sign-up`,
        { ...signUpForm.value },
        this.headersOptions
      )
      .subscribe(
        (response) => {
          this.rotuer.navigateByUrl('/sign-in');
        },
        (error) => console.log('Error signing up: ', error)
      );
  }
}

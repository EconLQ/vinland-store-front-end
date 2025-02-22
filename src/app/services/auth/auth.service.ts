import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserSignUpRequest } from '../../interfaces/user-sign-up-request';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authBaseUrl = `${environment.apiBaseUrl}/auth`;
  private accessToken: string | null = null;
  private headersOptions = {
    withCredentials: true, // include cookies with the request
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };
  // store auth state
  private authStatus = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatus.asObservable(); // expose auth status as observable
  constructor(private httpClient: HttpClient) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    const payload = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password);
    return this.httpClient
      .post<{ access_token: string }>(
        `${this.authBaseUrl}/sign-in`,
        payload,
        this.headersOptions
      )
      .pipe(
        tap((response) => {
          this.authStatus.next(true); // update auth status
          this.accessToken = response.access_token;
        })
      );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
  refreshToken(): Observable<any> {
    return this.httpClient
      .post<{ access_token: string }>(`${this.authBaseUrl}/refresh`, null, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.authStatus.next(true);
          this.accessToken = response.access_token;
        })
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
  public signOut(): Observable<string> {
    this.accessToken = null;
    return this.httpClient
      .post<string>(`${this.authBaseUrl}/logout`, null, {
        withCredentials: true,
      })
      .pipe(tap(() => this.authStatus.next(false)));
  }
  isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}

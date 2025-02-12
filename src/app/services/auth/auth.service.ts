import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserSignUpRequest } from '../../interfaces/user-sign-up-request';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';

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
  // store auth state
  private authStatus = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatus.asObservable(); // expose auth status as observable
  constructor(private httpClient: HttpClient) {}

  public login(loginData: {
    email: string;
    password: string;
  }): Observable<string> {
    const payload = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password);
    return this.httpClient
      .post<string>(
        `${this.authBaseUrl}/sign-in`,
        payload,
        this.headersOptions
      )
      .pipe(tap(() => this.authStatus.next(true))); // update auth status
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
    return this.httpClient
      .post<string>(`${this.authBaseUrl}/logout`, null, {
        withCredentials: true,
      })
      .pipe(tap(() => this.authStatus.next(false)));
  }
}

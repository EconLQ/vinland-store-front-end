import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../../common/user-info';
import { UserUpdateRequest } from '../../interfaces/user-update-request';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountBaseUrl = environment.apiBaseUrl + '/account';
  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${this.accountBaseUrl}/me`, {});
  }

  updateUserDetails(request: UserUpdateRequest): Observable<UserInfo> {
    const payload = new HttpParams()
      .set('username', request.username)
      .set('firstName', request.firstName)
      .set('lastName', request.lastName)
      .set('email', request.email)
      .set('oldPassword', request.oldPassword)
      .set('newPassword', request.newPassword);
    return this.httpClient.put<UserInfo>(this.accountBaseUrl, payload, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }
}

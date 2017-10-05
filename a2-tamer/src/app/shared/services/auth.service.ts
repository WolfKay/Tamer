import { User } from './../models/user.model';
import { BaseApiService } from './base-api.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService extends BaseApiService {
  private static baseUrl = `${BaseApiService.baseApi}/user`;
  private user: User;

  constructor(private http: Http) {
    super();
    this.user = JSON.parse(localStorage.getItem('currentUser'));    
  }

  isAuthenticated(): boolean {
    return this.user !== undefined;
  }

  authenticate(user: User): User {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    return this.user;
  }

  getCurrentUser(): User {
    return this.user;
  }

  deAutenticate(): void {
    this.user = undefined;
    localStorage.removeItem('currentUser');    
  }

  login(user: User): Observable<User> {
    return this.http.post(`${AuthService.baseUrl}/login`, JSON.stringify(user), BaseApiService.defaultOptions)
      .map((res: Response) => this.authenticate(res.json()))
      .catch(super.handleError);
  }

  register(user): Observable<User> {
    return this.http.post(AuthService.baseUrl, JSON.stringify(user), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(super.handleError);
  }

  logout(): Observable<boolean | string> {
    return this.http.post(AuthService.baseUrl, null, BaseApiService.defaultOptions)
      .map((res: Response) => {
        this.deAutenticate();
        return res.status === 204
      })
      .catch(super.handleError);
  }

}

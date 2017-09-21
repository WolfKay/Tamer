import { User } from './../models/user.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http) {}

  login(user: User): Observable<User> {
    const data: Object = {
      username: user.username,
      password: user.password
    };
    return this.http.post(`${this.baseUrl}/login`, JSON.stringify(data), this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  register(user: User): Observable<User> {
    const data: Object = {
      username: user.username,
      password: user.password
    };
    return this.http.post(`${this.baseUrl}/register`, JSON.stringify(data), this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  logout(): Observable<boolean | string> {
    return this.http.post(`${this.baseUrl}/logout`, null, this.options)
      .map((res: Response) => res.status === 204 )
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<string> {
    console.error(error);
    return Observable.throw(error.json().message);
  }

}

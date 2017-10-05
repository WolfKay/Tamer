import { User } from './../models/user.model';
import { BaseApiService } from './base-api.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseApiService {
  private static baseUrl = `${BaseApiService.baseApi}/user`;
  private user: User;

  constructor(private http: Http) {
    super();
    this.user = JSON.parse(localStorage.getItem('currentUser'));    
  }

  recs(): Observable<Array<User>> {
    return this.http.get(`${UserService.baseUrl}/recs`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(super.handleError);
  }

  like(id: string): Observable<User> {
    return this.http.post(`${UserService.baseUrl}/like/${id}`, null, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(super.handleError);
  }

  dislike(id: string): Observable<User> {
    return this.http.post(`${UserService.baseUrl}/dislike/${id}`, null, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(super.handleError);
  }

}

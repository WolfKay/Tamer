import { Message } from './../models/message.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MessageService {
  private baseUrl = 'http://localhost:3000/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http) {}

  getMessage(): Observable<Message> {
    return this.http.get(`${this.baseUrl}/message`, this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<string> {
    console.error(error);
    return Observable.throw(error.json().message);
  }

}

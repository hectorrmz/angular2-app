import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHelper } from '../services';

@Injectable()
export class OutlookService {
  headers: Headers = new Headers();
  options: RequestOptions = new RequestOptions();

  constructor(private http: Http, private authHelper: AuthHelper) {

    this.headers.append('Athorization', `Bearer ${this.authHelper.getMSToken()}`);
    this.options.headers = this.headers;

  }

  getToken(): any {
    return this.http.post('token', { code: this.authHelper.getCode() })
          .map(res => res.json())
          .catch((error: any) => Observable.throw(error.json()));
  }

  getCalendarView(startDateTime: string, endDateTime: string):any{
    return this.http.get(`events?startDateTime=${startDateTime}&endDateTime=${endDateTime}`)
          .map(res=>res.json())
          .catch((error: any) => Observable.throw(error.json()));
  }
}

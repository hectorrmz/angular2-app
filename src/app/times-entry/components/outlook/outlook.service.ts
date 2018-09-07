import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

const baseUrl: string = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/';
@Injectable()
export class OutlookService {
  constructor(private http: Http) {}

  authorizeApp() {
    this.http
      .get(`${baseUrl}authorize`, {
        params: {
          client_id: 'f4fc957d-8eaf-4147-83c9-82360e2ee051',
          response_type: 'code',
        },
      })
      .map(response => response.json())
      .catch(err => Observable.throw(err.json()));
  }

  getToken(): any {
    return this.http.post('token', { code: localStorage.getItem('code') });
  }
}

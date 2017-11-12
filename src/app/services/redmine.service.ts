import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthHelper } from './auth-helper.service';

@Injectable()
export class RedMineService {

    headers: Headers = new Headers();
    options: RequestOptions = new RequestOptions();

    constructor(private http: Http, private authHelper: AuthHelper) {

        if (this.authHelper.isAuthorized()) {
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('X-Redmine-API-Key', `${window.sessionStorage.getItem('api_key')}`);

            this.options.headers = this.headers;
        }

    }

    getIssues(): Observable<any> {

        let userId = this.authHelper.getRMUserId() ? this.authHelper.getRMUserId() : 0;

        return this.http
            .get(`issues?id=${userId}`, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getProjects(): Observable<any> {

        return this.http
            .get('projects', this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthHelper } from './auth-helper.service';

@Injectable()
export class RedMineService {

    headers: Headers = new Headers();
    options: RequestOptions = new RequestOptions();
    userId: number;

    constructor(private http: Http, private authHelper: AuthHelper) {

        if (this.authHelper.isAuthorized()) {
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('X-Redmine-API-Key', `${window.sessionStorage.getItem('api_key')}`);

            this.options.headers = this.headers;
        }

        this.userId = this.authHelper.getRMUserId() ? this.authHelper.getRMUserId() : 0;

    }

    getActivities(): Observable<any> {

        return this.http
            .get('activities', this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getIssues(): Observable<any> {

        return this.http
            .get(`issues?id=${this.userId}`, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getProjects(): Observable<any> {

        return this.http
            .get('projects', this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getTimeEntries(issueId: number, date: string) {
        return this.http.get(`times?id=${this.userId}&issue_id=${issueId}&spend_on=${date}`, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}
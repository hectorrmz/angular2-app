import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

//models
import { User } from '../models/User';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    loginRM(user: User): Observable<any> {
        return this.http
            .post('user', user)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}
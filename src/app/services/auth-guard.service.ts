import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthHelper } from './auth-helper.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthHelper, public router: Router) { }

    canActivate(): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
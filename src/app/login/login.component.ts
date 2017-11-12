import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

//services
import { AuthService } from '../services/auth.service';
import { AuthHelper } from '../services/auth-helper.service';

//models
import { UserRM } from '../models/UserRM';

@Component({
    selector: 'app-login',
    styleUrls: ['login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {

    user: any = {
        username: '',
        password: ''
    };

    error: string;
    loading: boolean = false;
    isLogged: boolean = false;

    constructor(private router: Router, private authService: AuthService, private authHelper: AuthHelper) { }

    login(form: NgForm, event: Event) {

        this.error = '';

        event.preventDefault();

        if (form.valid) {
            this.loading = true;
            this.authService.loginRM(this.user).finally(() => this.loading = false)
                .subscribe((response: any) => {
                    this._OnLogin(response.user);
                }, (response: any) => {
                    this.error = response.message;
                });
        }

    }

    private _OnLogin(user: UserRM) {
        this.isLogged = true;
        this.authHelper.AuthorizeUser(user);

        setTimeout(() => this.router.navigate(['']), 1000);

    }

}
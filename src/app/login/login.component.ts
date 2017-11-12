import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    styleUrls: ['login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {

    user: User = {
        username: '',
        password: ''
    };

    error: string;
    loading: boolean = false;

    constructor(private authService: AuthService) { }

    login(form: NgForm, event: Event) {

        this.error = '';

        event.preventDefault();

        if (form.valid) {
            this.loading = true;
            this.authService.loginRM(this.user).finally(() => this.loading = false)
                .subscribe((response: any) => {
                    console.log(response);
                }, (response: any) => {
                    this.error = response.message;
                });
        }

    }

}
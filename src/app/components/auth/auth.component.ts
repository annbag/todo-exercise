import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public password: string;
    public email: string;

    public isShouldDisplay = true;

    constructor(private user: UserService) { }

    ngOnInit() {
        this.user.user$.subscribe({
            next(status) {
                console.log('user status has changed', status);
                this.isShouldDisplay = !status;
                // console.log(this.isShouldDisplay);
            }
        });
    }

    async onLogin() {
        const status = await this.user.login(this.email, this.password);
        console.log(status);
    }

    onLogout() {
        this.user.logout();
    }
}

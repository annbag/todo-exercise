import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user$ = this.firebase.user$;

    constructor(private firebase: FirebaseService) {
        this.firebase.initApp();
        this.firebase.setup();
    }

    login(login, pass) {
        return this.firebase.login(login, pass);
    }

    logout() {
        this.firebase.logout();
    }
}

import { Component, OnInit, Input } from '@angular/core';
import 'firebase/auth';
import 'firebase/database';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-todo-auth',
    templateUrl: './todo-auth.component.html',
    styleUrls: ['./todo-auth.component.scss']
})
export class TodoAuthComponent implements OnInit {
    public password: string;
    public email: string;
    @Input() user: firebase.User;

    constructor() { }

    ngOnInit() {
    }

    onLogin() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    }

    onLogout() {
        firebase.auth().signOut();
    }
}

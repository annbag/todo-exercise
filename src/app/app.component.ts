import { ITodoForm } from './interfaces/itodo-form';
import 'firebase/auth';
import 'firebase/database';

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public user;
    public tasks: ITodoForm[];
    private dbRefList: firebase.database.Reference;

    ngOnInit() {
        this.firebaseInit();
    }

    firebaseInit() {
        const config = {
            apiKey: 'AIzaSyArJmDXixflLqxOK6LR--JUf1Q7aDPoGLY',
            databaseURL: 'https://todo-list-985.firebaseio.com/'
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(firebaseUser => {
            this.user = firebaseUser;
            console.log(this.user);
            this.displayTasks();
        });
    }

    displayTasks() {
        if (this.user) {
            this.dbRefList = firebase.database().ref('/users/' + this.user.uid);
            this.dbRefList.on('value', snapshot => {
                this.tasks = snapshot.val().todoTasks;
                console.log('Moja baza:', this.tasks);
            });
        } else if (this.dbRefList) {
            this.dbRefList.off();
            this.tasks = [];
        }
    }
}



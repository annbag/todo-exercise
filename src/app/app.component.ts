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
    public password: string;
    public email: string;
    public todoData = new TodoForm();
    public isVisibleForm = false;
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

    onLogin() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    }

    onLogout() {
        firebase.auth().signOut();
    }

    addNewTask() {
        this.isVisibleForm = !this.isVisibleForm;
    }

    addTask() {
        const dbRefList = firebase.database().ref('/users/' + this.user.uid).child('todoTasks');
        console.log(this.todoData, this.tasks.length);
        dbRefList.update({ [this.tasks.length]: this.todoData });

        this.todoData.category = '';
        this.todoData.name = '';
        this.todoData.finished = false;
        this.todoData.order = null;
        this.isVisibleForm = false;
    }

    toggleFinishedTask(index: number, isFinished: boolean) {
        console.log(index, !isFinished);
        firebase.database().ref(`users/${this.user.uid}/todoTasks/${index}/finished`).set(!isFinished);
    }
}

class TodoForm {
    constructor(
        public category?: string,
        public name?: string,
        public finished: boolean = false,
        public order?: number
    ) { }
}

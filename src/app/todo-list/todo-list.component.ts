import { ITodoForm } from './../interfaces/itodo-form';
import { Component, OnInit, Input } from '@angular/core';
import 'firebase/auth';
import 'firebase/database';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    public isVisibleForm = false;
    public todoData = new TodoForm();

    @Input() user: firebase.User;
    @Input() tasks: ITodoForm[];

    constructor() { }

    ngOnInit() {
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

    removeTask(index: number) {
        console.log(index)
        firebase.database().ref(`users/${this.user.uid}/todoTasks/${index}/`).remove();
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

import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class TaskListService {

    constructor(private firebase: FirebaseService) { }

    update(key: string, value: any) {
        this.firebase.update(key, value);
    }

    loadTasks(cb) {
        this.firebase.listenOn(cb);
    }

    markTaskAsDone(index: number, isFinished: boolean) {
        const user = this.firebase.user$.value;
        this.firebase.database().ref(`users/${user.uid}/todoTasks/${index}/finished`).set(!isFinished);
    }

    removeTask(index: number) {
        const user = this.firebase.user$.value;
        this.firebase.database().ref(`users/${user.uid}/todoTasks/${index}/`).remove();
    }
}

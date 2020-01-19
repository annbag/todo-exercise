import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import 'firebase/auth';
import 'firebase/database';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs';

const NOT_LOGGED_STATUS = null;

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    public user$ = new BehaviorSubject(NOT_LOGGED_STATUS);
    private dbRefList: firebase.database.Reference;

    initApp() {
        firebase.initializeApp(environment.firebaseConfig);
    }

    setup() {
        console.log('firebase - setup');
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                this.user$.next(firebaseUser);
                resolve(firebaseUser);
                console.log('firebase - setup end');
            });
        });
    }

    listenOn(cb: (snapshot: any) => void) {
        console.log('firebase - listenOn');

        this.user$.subscribe({
            next: (user) => {
                if (user) {
                    this.dbRefList = this.database().ref('/users/' + user.uid);
                    this.dbRefList.on('value', snapshot => {
                        cb(snapshot.val());
                    });
                } else if (this.dbRefList) {
                    this.dbRefList.off();
                }
            }
        })

    }

    login(login: string, pass: string) {
        console.log('firebase - login');
        return firebase.auth().signInWithEmailAndPassword(login, pass);
    }

    logout() {
        console.log('firebase - logout');
        firebase.auth().signOut();
    }

    update(key: string, value: any) {
        console.log('firebase - update');
        const user = this.user$.value;
        const dbRefList = this.database().ref('/users/' + user.uid).child(key);
        dbRefList.update(value);
    }

    database() {
        return firebase.database();
    }
}

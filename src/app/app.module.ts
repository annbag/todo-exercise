import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoAuthComponent } from './todo-auth/todo-auth.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoAuthComponent,
        TodoListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

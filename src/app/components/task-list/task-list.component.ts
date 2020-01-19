import { Component, OnInit, Input } from '@angular/core';

import { ITask } from '../../interfaces/itodo-form';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    public isVisibleForm = false;
    public task: ITask = {
        id: '',
        category: '',
        name: '',
        finished: false,
        order: 0,
    };

    tasks: ITask[];

    public isShouldDisplay = true;

    constructor(private taskList: TaskListService) { }

    ngOnInit() {
        this.taskList.loadTasks((data) => {
            this.tasks = Object.values(data.todoTasks);
            console.log('Moja baza:', this.tasks);
        });
    }

    addNewTask() {
        this.isVisibleForm = !this.isVisibleForm;
    }

    addTask() {
        this.task.id = `id-${Date.now()}`;
        this.taskList.update('todoTasks', { [this.task.id]: this.task });

        this.task = {
            id: '',
            category: '',
            name: '',
            finished: false,
            order: 0,
        };

        this.isVisibleForm = false;
    }

    toggleFinishedTask(taskId: number, isFinished: boolean) {
        console.log('toggleFinishedTask', taskId);
        this.taskList.markTaskAsDone(taskId, isFinished);
    }

    removeTask(taskId: number) {
        this.taskList.removeTask(taskId);
    }
}

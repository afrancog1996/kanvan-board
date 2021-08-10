import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  nameTask: string;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();

  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask(): void {
    if(this.nameTask.length > 0 && !this.tasks.some(task => task.name === this.nameTask)){
      this.tasks.push({ name: this.nameTask, stage: 0 });
      this.nameTask = '';
      this.configureTasksForRendering();
    }
  }

  deleteTask(element: Task, index: number): void {
    let modifyTask = this.tasks.filter(current => current != element);
    this.tasks = modifyTask;
    this.configureTasksForRendering();
  }

  moveRight(element: Task, key: number): void {
    let modifyTask = this.tasks.map(
      (current) => {
        if (element === current && current.stage < 3) {
          return {
            ...current,
            stage: current.stage + 1
          }
        } else {
          return {
            ...current
          }
        }
      }
    );
    this.tasks = modifyTask;
    this.configureTasksForRendering();
  }

  moveLeft(element: Task, key: number): void {
    let modifyTask = this.tasks.map(
      (current) => {
        if (element === current && current.stage > 0) {
          return {
            ...current,
            stage: current.stage - 1
          }
        } else {
          return {
            ...current
          }
        }
      }
    );
    this.tasks = modifyTask;
    this.configureTasksForRendering();
  }


}

interface Task {
  name: string;
  stage: number;
}
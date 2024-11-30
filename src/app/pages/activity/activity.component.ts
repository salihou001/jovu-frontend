import { Component } from '@angular/core';
import { BoxTaskComponent } from '../../shared/components/box-task/box-task.component';
import { TaskStatusComponent } from "../../shared/components/task-status/task-status.component";
import { AddTaskComponent } from "../../shared/components/add-task/add-task.component";
import { DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [BoxTaskComponent, TaskStatusComponent, AddTaskComponent, DragDropModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

  tasks = ['Tâche 1', 'Tâche 2', 'Tâche 3', 'Tâche 4'];
  tasks1 = ['Tâche 1', 'Tâche 2'];
  tasks2 = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
  tasks3 = ['Tâche 1', 'Tâche 2', 'Tâche 3', 'Tâche 4'];
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    console.log('Nouvel ordre des tâches :', this.tasks);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  
}

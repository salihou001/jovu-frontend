import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskStatusComponent } from "../task-status/task-status.component";
import { AddTaskComponent } from "../add-task/add-task.component";
import { BoxTaskComponent } from "../box-task/box-task.component";
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Column, Task } from '../../models/task.model';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [TaskStatusComponent, AddTaskComponent, BoxTaskComponent, CommonModule, DragDropModule, ModalComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  @Input() tasks!: Task[];
  @Input() column!: Column;
  @Input() title!: string;
  @Input() color!: string;

  showModal: boolean = false;
  typeOfTask!: string;

  onDrop(event: CdkDragDrop<Task[], any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
  trackByIndex = (index: number) => index;
  onModalClose = () => this.showModal = false;
  setTypeOfTask = (type: string) => this.typeOfTask = type;

}

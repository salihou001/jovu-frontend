import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, input } from '@angular/core';
import { TaskStatusComponent } from "../task-status/task-status.component";
import { AddTaskComponent } from "../add-task/add-task.component";
import { BoxTaskComponent } from "../box-task/box-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [TaskStatusComponent, AddTaskComponent, BoxTaskComponent, CommonModule, DragDropModule, ModalComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  @Input() tasks!: Task[];
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
  setTypeOfTask(type: string) { this.typeOfTask = type; }
  trackByIndex(index: number) { return index; }
  onModalClose() {
    this.showModal = false;
  }
}

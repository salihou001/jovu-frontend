import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubTask } from '../../models/task.model';

@Component({
  selector: 'app-sub-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sub-task-list.component.html',
  styleUrl: './sub-task-list.component.scss'
})
export class SubTaskListComponent {
  @Input() subtasks: SubTask[] | undefined = [];
  @Output() subtasksChange = new EventEmitter<
    { title: string; completed: boolean }[]
  >();

  addSubtask() {
    this.subtasks?.push({ title: '', completed: false });
    this.subtasksChange.emit(this.subtasks);
  }

  removeSubtask(index: number) {
    this.subtasks?.splice(index, 1);
    this.subtasksChange.emit(this.subtasks);
  }
}

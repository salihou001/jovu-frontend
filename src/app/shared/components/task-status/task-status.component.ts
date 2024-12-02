import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
  tasks = input.required<Task[]>();
  activityTpe = input.required<string>();
  activityColor = input.required<string>();
}

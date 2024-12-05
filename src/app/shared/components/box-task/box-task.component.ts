import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-box-task',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './box-task.component.html',
  styleUrl: './box-task.component.scss'
})
export class BoxTaskComponent {
  @Input() task!: Task;
  completedSubtasks: WritableSignal<number> = signal(0);
  totalSubtasks: WritableSignal<number> = signal(0);
  tagColor: string = '#f3f4f6';

  ngOnInit(): void {
    this.calculateSubtasks();
    this.setTagColor();
  }

  // Calculer le nombre de sous-tâches terminées et le total
  private calculateSubtasks(): void {
    if (this.task.subtasks) {
      this.completedSubtasks.set(this.task.subtasks.filter((subtask) => subtask.completed).length);
      this.totalSubtasks.set(this.task.subtasks.length);
    }
  }

  // Définir la couleur de l'étiquette en fonction du label
  private setTagColor(): void {
    const tagColors: { [key: string]: string } = {
      Design: '#f97316',
      'UX stages': '#0ea5e9',
      Development: '#22c55e',
      Testing: '#fbbf24',
    };
    this.tagColor = tagColors[this.task.label ?? ''] || '#f3f4f6';
  }
}

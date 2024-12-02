import { TaskColumnComponent } from "../../shared/components/task-column/task-column.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { mockColumns } from '../../shared/mock/column';
import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [DragDropModule, TaskColumnComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  items = mockColumns;
}

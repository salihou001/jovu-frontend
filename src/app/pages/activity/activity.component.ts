import { Component, OnInit, inject } from '@angular/core';
import { DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { mockColumns } from '../../shared/mock/column';
import { TaskColumnComponent } from "../../shared/components/task-column/task-column.component";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [DragDropModule, ModalComponent, TaskColumnComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {

  showModal: boolean = false;
  typeOfTask!: string;
  items = mockColumns;

  async ngOnInit(): Promise<void> {}

}

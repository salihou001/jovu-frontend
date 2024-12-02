import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  // Input pour personnaliser le titre
  @Input() typeTask!: string;
  @Input() title: string = 'Add New Task';
  @Input() showModal: boolean = false;

  // Événement déclenché lorsqu'on clique sur l'élément
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() typeOfTask = new EventEmitter<string>();

  openModal() {
    this.showModal = true;
    this.showModalChange.emit(this.showModal);
    this.typeOfTask.emit(this.typeTask);
  }

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }
}

import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Titre de la modal';
  @Input() content: string = 'Contenu de la modal';

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  // Méthode pour stopper la propagation de l'événement
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

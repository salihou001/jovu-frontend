import { EventEmitter, inject } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services/loader.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() typeTask!: string;
  @Input() content: string = 'Contenu de la modal';

  @Output() closeModal = new EventEmitter<void>();

  
  task!: Task;
  
  
  private toastSrv: ToastrService = inject(ToastrService);
  private loaderSrv: LoaderService = inject(LoaderService);

  close() {
    this.closeModal.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  async createTask() {
    try {
      this.loaderSrv.show();
      if (!this.task.title || !this.task.description) {
        alert('Veuillez remplir tous les champs requis.');
        return;
      }
      
      // Ajoute la tâche dans Firestore (par exemple dans une colonne "To Do")
      // await this.columnService.updateColumn('ToDo', this.task);
      this.toastSrv.success('Tâche créée avec succès !');
      this.close();
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }finally { this.loaderSrv.hide(); }
  }
}

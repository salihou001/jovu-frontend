import { EventEmitter, OnInit, inject } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services/loader.service';
import { Column, Task } from '../../models/task.model';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import { ColumnService } from '../../services/column.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Input() typeTask!: string;
  @Input() column!: Column;
  @Input() content: string = 'Contenu de la modal';

  @Output() closeModal = new EventEmitter<void>();

  firestore: Firestore = inject(Firestore);
  users!: Partial<User>[];
  task: Partial<Task> = {
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Medium',
    status: 'To Do',
    assignee: '' // Utilisateur assigné
  };;

  async ngOnInit(): Promise<void> {
    await this.loadUsers(); // Charger les utilisateurs lors du démarrage
  }

  async loadUsers(): Promise<void> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const snapshot = await getDocs(usersCollection);
      this.users = snapshot.docs.map(doc => ({
        uid: doc.id,
        displayName: doc.data()['displayName']
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  }
  
  
  private columnService: ColumnService = inject(ColumnService);
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
        this.toastSrv.error('Veuillez remplir tous les champs requis.');
        return;
      }
      console.log("task", this.task);
      console.log("column", this.column);
      if(!this.column.tasks) { this.column.tasks = [] }
      this.column.tasks.push(this.task as any);
      await this.columnService.updateColumn(this.column);
      this.toastSrv.success('Tâche créée avec succès !');
      this.close();
      await this.loadUsers();
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }finally { this.loaderSrv.hide(); }
  }

  addSubtask() {
    if (!this.task?.subtasks) {
      this.task.subtasks = [];
    }
    this.task.subtasks.push({ title: '', completed: false });
  }

  removeSubtask(index: number) {
    this.task?.subtasks?.splice(index, 1);
  }
}

import { SubTaskListComponent } from "../sub-task-list/sub-task-list.component";
import { InputTextComponent } from "../input-text/input-text.component";
import { TextAreaComponent } from "../text-area/text-area.component";
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SelectComponent } from "../select/select.component";
import { ColumnService } from '../../services/column.service';
import { EventEmitter, OnInit, inject } from '@angular/core';
import { DateComponent } from "../date/date.component";
import { LoaderService } from '../../services/loader.service';
import { Column, Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, InputTextComponent, TextAreaComponent, DateComponent, SelectComponent, SubTaskListComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Input() typeTask!: string;
  @Input() column!: Column;
  @Input() content: string = '';

  @Output() closeModal = new EventEmitter<void>();

  users!: Partial<User>[];
  task: Partial<Task> = {
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Medium',
    status: 'To Do',
    assignee: '' ,
    subtasks: []
  };

  // Options priorities
  priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ];

  // Options status
  statusOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Done', label: 'Terminé' }
  ];
  listType = [
    { value: 'UX/UI', label: 'UX/UI' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Fullstack', label: 'Fullstack' }
  ];
  
  private firestore: Firestore = inject(Firestore);
  private toastSrv: ToastrService = inject(ToastrService);
  private loaderSrv: LoaderService = inject(LoaderService);
  private columnService: ColumnService = inject(ColumnService);

  async ngOnInit(): Promise<void> { await this.loadUsers(); }

  async loadUsers(): Promise<void> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const snapshot = await getDocs(usersCollection);
      this.users = snapshot.docs.map(doc => ({
        uid: doc.id,
        displayName: doc.data()['displayName']
      }));
    } catch (error) {
      this.toastSrv.error('Verify your internet connexion :'); return;
    }
  }
  
  close = () => this.closeModal.emit(); 
  stopPropagation = (event: Event) => event.stopPropagation();

  async createTask() {
    try {
      this.loaderSrv.show();
      if (!this.task.title || !this.task.description) { this.toastSrv.error('Fields are required.');return; }
      if(!this.column.tasks) { this.column.tasks = [] }
      this.column.tasks.push(this.task as any);
      await this.columnService.updateColumn(this.column);
      this.toastSrv.success('New task created successfully !');
      this.close();
      await this.loadUsers();
    } catch (error) {
      this.toastSrv.error('Error during creation of new task !');
    }finally { this.loaderSrv.hide(); }
  }

  addSubtask() {
    this.task.subtasks ??= [];
    this.task.subtasks.push({ title: '', completed: false });
  }

  removeSubtask = (index: number) => this.task?.subtasks?.splice(index, 1);
}

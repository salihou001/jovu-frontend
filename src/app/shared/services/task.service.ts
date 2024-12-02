import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskCollection = this.firestore.collection<Task>('tasks');

  constructor(private firestore: AngularFirestore) {}

  // Récupérer toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.taskCollection.valueChanges({ idField: 'id' });
  }

  // Ajouter une nouvelle tâche
  addTask(task: Task): Promise<void> {
    const id = this.firestore.createId();
    return this.taskCollection.doc(id).set({
      ...task,
      id: id,
      createdAt: new Date(),
    });
  }

  // Mettre à jour une tâche existante
  updateTask(task: Task): Promise<void> {
    return this.taskCollection.doc(task.id).update({
      ...task,
      updatedAt: new Date(),
    });
  }

  // Supprimer une tâche
  deleteTask(id: string): Promise<void> {
    return this.taskCollection.doc(id).delete();
  }
}

import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private collectionPath = 'tasks';

  private firestore : Firestore = inject(Firestore);

  // *** CREATE : Ajouter une tâche ***
  async addTask(task: Task): Promise<void> {
    try {
      const taskCollection = collection(this.firestore, this.collectionPath);
      await addDoc(taskCollection, task);
      console.log('Tâche ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
      throw error;
    }
  }

  // *** READ : Obtenir la liste des tâches ***
  async getTasks(): Promise<Task[]> {
    try {
      const taskCollection = collection(this.firestore, this.collectionPath);
      const tasks$: Observable<Task[]> = collectionData(taskCollection, { idField: 'id' }) as Observable<Task[]>;
      return await lastValueFrom(tasks$); // Convertir l'observable en promesse et attendre le dernier résultat
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
      throw error;
    }
  }

  // *** UPDATE : Mettre à jour une tâche ***
  async updateTask(taskId: string, task: Partial<Task>): Promise<void> {
    try {
      const taskDoc = doc(this.firestore, `${this.collectionPath}/${taskId}`);
      await updateDoc(taskDoc, task);
      console.log('Tâche mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      throw error;
    }
  }

  // *** DELETE : Supprimer une tâche ***
  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskDoc = doc(this.firestore, `${this.collectionPath}/${taskId}`);
      await deleteDoc(taskDoc);
      console.log('Tâche supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
      throw error;
    }
  }
}

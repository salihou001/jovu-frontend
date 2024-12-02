import { Column, Task } from '../models/task.model';
import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private firestore: Firestore = inject(Firestore);
  private columnsCollection: CollectionReference<Column> = collection(this.firestore, 'columns') as CollectionReference<Column>;

  // *** RÉCUPÉRER TOUTES LES COLONNES ***
  async getColumns(): Promise<Column[]> {
    try {
      const snapshot = await getDocs(this.columnsCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Column[];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des colonnes : ${error}`);
    }
  }

  // *** AJOUTER UNE NOUVELLE COLONNE ***
  async addColumn(column: Column): Promise<void> {
    try {
      const id = uuidv4(); // Génère un ID unique
      const columnDocRef = doc(this.columnsCollection, id);
      await setDoc(columnDocRef, { ...column, id });
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de la colonne : ${error}`);
    }
  }

  // *** METTRE À JOUR UNE COLONNE EXISTANTE ***
  async updateColumn(column: Column): Promise<void> {
    try {
      if (!column.id) {
        throw new Error("L'ID de la colonne est requis pour la mise à jour.");
      }
      const columnDocRef = doc(this.columnsCollection, column.id);
      await updateDoc(columnDocRef, { ...column });
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la colonne : ${error}`);
    }
  }

  // *** SUPPRIMER UNE COLONNE ***
  async deleteColumn(id: string): Promise<void> {
    try {
      const columnDocRef = doc(this.columnsCollection, id);
      await deleteDoc(columnDocRef);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la colonne : ${error}`);
    }
  }

  async addTaskToColumn(columnId: string, task: Task): Promise<void> {
    const taskRef = collection(this.firestore, `columns/${columnId}/tasks`);
    await addDoc(taskRef, { ...task, createdAt: new Date().toISOString() });
  }
}

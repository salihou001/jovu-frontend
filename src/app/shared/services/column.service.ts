import { Column, Task } from '../models/task.model';
import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, WithFieldValue, addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
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

  // *** Récupérer toutes les colonnes avec leurs tâches associées ***
  getColumnsWithTasks = async (): Promise<Column[]> => {
    try {
      const columnsSnapshot = await getDocs(this.columnsCollection);
      const columns: Column[] = [];

      for (const columnDoc of columnsSnapshot.docs) {
        const columnData = columnDoc.data() as Column;
        const tasksSnapshot = await getDocs(collection(this.firestore, `columns/${columnDoc.id}/tasks`));
        
        // Ajouter les tâches récupérées à la colonne
        const tasks: Task[] = tasksSnapshot.docs.map(taskDoc => ({ id: taskDoc.id, ...taskDoc.data() } as Task));
        
        // Ajouter la colonne avec ses tâches au tableau final
        columns.push({
          ...columnData,
          id: columnDoc.id,
          tasks
        });
      }

      return columns;
    } catch (error) {
      console.error('Erreur lors de la récupération des colonnes et des tâches :', error);
      throw error;
    }
  };

  // *** AJOUTER UNE NOUVELLE COLONNE ***
  // async addColumn(column: Column): Promise<void> {
  //   try {
  //     const id = uuidv4(); // Génère un ID unique
  //     const columnDocRef = doc(this.columnsCollection, id);
  //     await setDoc(columnDocRef, { ...column, id });
  //   } catch (error) {
  //     throw new Error(`Erreur lors de l'ajout de la colonne : ${error}`);
  //   }
  // }

  // *** AJOUTER UNE NOUVELLE COLONNE AVEC SES TÂCHES ***
  addColumn = async (column: Column): Promise<void> => {
    try {
      const columnId = uuidv4(); // Génère un ID unique pour la colonne
      const columnDocRef = doc(this.columnsCollection, columnId);

      // Ajout de la colonne
      await setDoc(columnDocRef, {
        id: columnId,
        title: column.title,
        color: column.color,
      } as WithFieldValue<Column>);

      // Ajout des tâches dans la sous-collection `tasks` de la colonne
      for (const task of column.tasks) {
        const taskCollectionRef = collection(this.firestore, `columns/${columnId}/tasks`);
        await addDoc(taskCollectionRef, { ...task, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }
    } catch (error: any) {
      console.error(`Erreur lors de l'ajout de la colonne : ${error.message || error}`);
    }
  };

  // *** METTRE À JOUR UNE COLONNE EXISTANTE ***
  async updateColumn(column: Column): Promise<void> {
    try {
      debugger;
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

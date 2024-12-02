export interface SubTask {
    id?: string;
    title: string; // Titre de la sous-tâche
    completed: boolean; // État d'achèvement
  }
  
  export interface Task {
    id?: string; // ID généré automatiquement par Firestore
    title: string; // Titre de la tâche
    description: string; // Description de la tâche
    status: 'To Do' | 'In Progress' | 'Need Review' | 'Done'; // Statut de la tâche
    label?: string; // Étiquette (ex : 'Design', 'UX stages')
    subtasks: SubTask[]; // Liste des sous-tâches
    priority: 'Low' | 'Medium' | 'High'; // Priorité de la tâche
    dueDate?: Date; // Date d'échéance
    createdAt?: Date; // Date de création
    updatedAt?: Date; // Dernière mise à jour
    assignee?: string; // Personne assignée
    comments?: string[]; // Liste des commentaires associés à la tâche
    attachments?: string[]; // URLs des pièces jointes
    estimatedTime?: number; // Temps estimé pour terminer la tâche (en heures)
    tags?: string[]; // Liste de tags/catégories associés à la tâche
    completed?: boolean; // Indique si la tâche est terminée
    progress?: number; // Progrès de la tâche (en pourcentage)
    views: number;
  }
  


export interface Column {
    id?: string;
    title: 'To Do' | 'In Progress' | 'Need Review' | 'Done'; // Titre de la colonne
    tasks: Task[]; // Liste des tâches dans cette colonne
    color: string;
}

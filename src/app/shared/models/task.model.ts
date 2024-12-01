export interface Task {
    id: string;
    title: string;
    description?: string;
    assigneeId?: string; // ID de l'utilisateur assigné
    dueDate?: Date;
    labels?: string[];
    status: 'To Do' | 'In Progress' | 'Done';
    priority?: 'Low' | 'Medium' | 'High';
    createdAt: Date;
    updatedAt?: Date;
}

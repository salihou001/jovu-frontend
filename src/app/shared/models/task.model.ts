export interface SubTask {
    id?: string;
    title: string; 
    completed: boolean;
  }
  
  export interface Task {
    id?: string; 
    title: string; 
    description: string; 
    status: 'To Do' | 'In Progress' | 'Need Review' | 'Done'; 
    label?: string; 
    subtasks: SubTask[]; 
    priority: 'Low' | 'Medium' | 'High'; 
    dueDate?: Date;
    createdAt?: Date; 
    updatedAt?: Date;
    assignee?: string; 
    comments?: string[]; 
    attachments?: string[]; 
    estimatedTime?: number; 
    tags?: string[]; 
    completed?: boolean; 
    progress?: number; 
    views: number;
  }
  


export interface Column {
    id?: string;
    title: 'To Do' | 'In Progress' | 'Need Review' | 'Done'; 
    tasks: Task[];
    color: string;
}

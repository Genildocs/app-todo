export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  important: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
} 
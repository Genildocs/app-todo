import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { NotificationService } from '../../services/notification.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService, NotificationService],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
    title: '',
    description: '',
    completed: false,
    priority: 'medium',
    dueDate: new Date(),
    important: false,
  };
  editingTodo: Todo | null = null;

  constructor(
    private todoService: TodoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
      error: (error: any) => {
        this.notificationService.error('Erro ao carregar tarefas');
        console.error('Erro ao carregar tarefas:', error);
      },
    });
  }

  createTodo(): void {
    if (!this.newTodo.title.trim()) {
      this.notificationService.warning('O título é obrigatório');
      return;
    }

    this.todoService.createTodo(this.newTodo).subscribe({
      next: (todo: Todo) => {
        this.todos.push(todo);
        this.newTodo = {
          title: '',
          description: '',
          completed: false,
          priority: 'medium',
          dueDate: new Date(),
          important: false,
        };
        this.notificationService.success('Tarefa criada com sucesso');
      },
      error: (error: any) => {
        this.notificationService.error('Erro ao criar tarefa');
        console.error('Erro ao criar tarefa:', error);
      },
    });
  }

  updateTodo(todo: Todo): void {
    if (!todo.title.trim()) {
      this.notificationService.warning('O título é obrigatório');
      return;
    }

    this.todoService.updateTodo(todo).subscribe({
      next: (updatedTodo: Todo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        this.editingTodo = null;
        this.notificationService.success('Tarefa atualizada com sucesso');
      },
      error: (error: any) => {
        this.notificationService.error('Erro ao atualizar tarefa');
        console.error('Erro ao atualizar tarefa:', error);
      },
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.notificationService.success('Tarefa excluída com sucesso');
      },
      error: (error: any) => {
        this.notificationService.error('Erro ao excluir tarefa');
        console.error('Erro ao excluir tarefa:', error);
      },
    });
  }

  startEditing(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  cancelEditing(): void {
    this.editingTodo = null;
  }
}

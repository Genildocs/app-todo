import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../interfaces/todo';
import { NotificationService } from '../../services/notification.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [TodoService, NotificationService]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  error = '';

  constructor(
    private todoService: TodoService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Erro ao carregar tarefas';
        this.loading = false;
        this.notificationService.error(this.error);
      }
    });
  }

  toggleTodoStatus(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        const status = updatedTodo.completed ? 'concluída' : 'pendente';
        this.notificationService.success(`Tarefa marcada como ${status}`);
        this.loadTodos();
      },
      error: () => {
        this.notificationService.error('Erro ao atualizar tarefa');
      }
    });
  }

  deleteTodo(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.notificationService.success('Tarefa excluída com sucesso');
          this.loadTodos();
        },
        error: () => {
          this.notificationService.error('Erro ao excluir tarefa');
        }
      });
    }
  }

  editTodo(id: string): void {
    this.router.navigate(['/todo/edit', id]);
  }
} 
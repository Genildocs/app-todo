import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../shared/interfaces/todo';
import { NotificationService } from '../../../shared/services/notification.service';
import { TodoService } from '../../../shared/services/todo.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;

  constructor(
    private todoService: TodoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Erro ao carregar tarefas');
        this.loading = false;
      }
    });
  }

  onEdit(todo: Todo): void {
    // Implementar lógica de edição
    this.notificationService.info('Funcionalidade de edição em desenvolvimento');
  }

  onDelete(todo: Todo): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.todoService.deleteTodo(todo.id!).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== todo.id);
          this.notificationService.success('Tarefa excluída com sucesso');
        },
        error: () => {
          this.notificationService.error('Erro ao excluir tarefa');
        }
      });
    }
  }
}

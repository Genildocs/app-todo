import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheck, heroPencil, heroStar, heroTrash } from '@ng-icons/heroicons/outline';
import { Todo } from '../../interfaces/todo';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-todo-table-list-todo',
  standalone: false, 
  providers: [
    provideIcons({ heroTrash, heroPencil, heroStar, heroCheck })
  ],
  templateUrl: './todo-table-list-todo.component.html',
  styleUrls: ['./todo-table-list-todo.component.scss']
})
export class TodoTableListTodoComponent {
  protected readonly icons = {
    trash: 'heroTrash',
    pencil: 'heroPencil',
    star: 'heroStar',
    check: 'heroCheck'
  };

  @Input() todos: Todo[] = [];
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  showOptionsModal = false;
  selectedTodo: Todo | null = null;
  modalPosition = { x: 0, y: 0 };

  constructor(private notificationService: NotificationService) {}

  toggleOptionsModal(event: MouseEvent, todo: Todo) {
    event.stopPropagation();
    this.selectedTodo = todo;
    this.showOptionsModal = true;
    this.modalPosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  editTodo(todo: Todo | null) {
    if (todo) {
      this.showOptionsModal = false;
      this.edit.emit(todo);
    }
  }

  deleteTodo(todo: Todo | null) {
    if (todo) {
      this.showOptionsModal = false;
      this.delete.emit(todo);
    }
  }

  closeOptionsModal() {
    this.showOptionsModal = false;
    this.selectedTodo = null;
  }

  onEdit() {
    if (this.selectedTodo) {
      this.editTodo(this.selectedTodo);
    }
  }

  onDelete() {
    if (this.selectedTodo?.id) {
      this.deleteTodo(this.selectedTodo);
    }
    this.closeOptionsModal();
  }

  toggleImportant() {
    if (this.selectedTodo) {
      this.selectedTodo.important = !this.selectedTodo.important;
      this.notificationService.success(
        this.selectedTodo.important 
          ? 'Tarefa marcada como importante!' 
          : 'Tarefa desmarcada como importante!'
      );
    }
    this.closeOptionsModal();
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.notificationService.success(
      todo.completed 
        ? 'Tarefa marcada como concluída!' 
        : 'Tarefa desmarcada como concluída!'
    );
  }

  getPriorityClass(priority: string): string {
    const classes = {
      'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return classes[priority as keyof typeof classes] || '';
  }
}

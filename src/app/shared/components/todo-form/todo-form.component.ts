import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<any>();
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todo = {
        ...this.todoForm.value,
        id: Date.now(),
        completed: false,
        createdAt: new Date()
      };
      
      this.todoCreated.emit(todo);
      this.todoForm.reset({ priority: 'medium' });
      this.notificationService.success('Tarefa criada com sucesso!');
    } else {
      this.notificationService.error('Por favor, preencha todos os campos corretamente');
    }
  }
} 
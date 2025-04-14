import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-todo-side-bar',
  templateUrl: './todo-side-bar.component.html',
  styleUrl: './todo-side-bar.component.scss'
})
export class TodoSideBarComponent implements OnInit {
  @Input() isOpen = true;
  showTodoForm = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    if (window.innerWidth < 768) {
      this.isOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  onAddNewTask(): void {
    this.showTodoForm = true;
  }

  onTodoCreated(todo: any): void {
    this.showTodoForm = false;
    if (todo) {
      // Aqui você pode adicionar a lógica para salvar a tarefa
      console.log('Nova tarefa criada:', todo);
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.notificationService.success('Logout realizado com sucesso!');
    this.router.navigate(['/auth/login']);
  }
}

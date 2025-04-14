import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  isSidebarOpen = true;

  onToggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

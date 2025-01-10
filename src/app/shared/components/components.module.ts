import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoSideBarComponent } from './todo-side-bar/todo-side-bar.component';
import { TodoTableListTodoComponent } from './todo-table-list-todo/todo-table-list-todo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    TodoSideBarComponent,
    TodoTableListTodoComponent,
    HeaderComponent,
  ],
  imports: [CommonModule],
  exports: [TodoSideBarComponent, TodoTableListTodoComponent, HeaderComponent],
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoSideBarComponent } from './todo-side-bar/todo-side-bar.component';
import { TodoTableListTodoComponent } from './todo-table-list-todo/todo-table-list-todo.component';
import { HeaderComponent } from './header/header.component';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { IconsModule } from '../../icons/icons/icons.module';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    TodoSideBarComponent,
    TodoTableListTodoComponent,
    HeaderComponent,
    DarkModeComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, IconsModule],
  exports: [
    TodoSideBarComponent,
    TodoTableListTodoComponent,
    HeaderComponent,
    DarkModeComponent,
  ],
})
export class ComponentsModule {}

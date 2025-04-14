import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../icons/icons/icons.module';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoSideBarComponent } from './todo-side-bar/todo-side-bar.component';
import { TodoTableListTodoComponent } from './todo-table-list-todo/todo-table-list-todo.component';

@NgModule({
  declarations: [
    TodoSideBarComponent,
    HeaderComponent,
    DarkModeComponent,
    ProfileComponent,
    FooterComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoTableListTodoComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    TodoSideBarComponent,
    HeaderComponent,
    DarkModeComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoTableListTodoComponent
  ]
})
export class ComponentsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../shared/components/components.module';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserProfileComponent,
    SettingsComponent,
    TodoComponent
  ],
  imports: [
    CommonModule, 
    TodoRoutingModule, 
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule
  ],
})
export class TodoModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Moon, Sun, Key, Lock, Mail, User } from 'angular-feather/icons';

const icons = {
  Moon,
  Sun,
  Key,
  Lock,
  Mail,
  User,
};
@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import {
  Moon,
  Sun,
  Key,
  Lock,
  Mail,
  User,
  LogOut,
  Settings,
  Book,
  Star,
  Inbox,
  Trash,
  ThumbsUp,
  AtSign,
  Eye,
  EyeOff
} from 'angular-feather/icons';

const icons = {
  Moon,
  Sun,
  Key,
  Lock,
  Mail,
  User,
  LogOut,
  Settings,
  Book,
  Star,
  Inbox,
  Trash,
  ThumbsUp,
  AtSign,
  Eye,
  EyeOff
};
@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}

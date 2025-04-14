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
  EyeOff,
  Sidebar
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
  EyeOff,
  Sidebar
};
@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}

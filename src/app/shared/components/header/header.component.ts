import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _router = inject(Router);
  @Output() toggleSidebar = new EventEmitter<void>();

  redirectHomePage() {
    this._router.navigate(['todo/home']);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userEmail: string = '';
  isVisible: boolean = false;
  private _router = inject(Router);
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = Object.values(this.authService.getUserScopes())[1].replace(
      '@gmail.com',
      ''
    );
  }

  toggleProfile() {
    this.isVisible = !this.isVisible;
  }

  singOut() {
    this.authService.logout();
    this._router.navigate(['auth/login']);
  }
}

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _router = inject(Router);
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    return this.authService.verifyToken().pipe(
      map((res) => {
        if (res.valid && this.authService.isAuthenticated()) {
          return true;
        }
        this._router.navigate(['auth/login']);
        return false;
      }),
      catchError((error) => {
        console.error('Erro na verificação do token:', error);
        this._router.navigate(['auth/login']);
        return of(false);
      })
    );
  }
}

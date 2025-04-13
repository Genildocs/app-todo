import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _router = inject(Router);
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('AuthGuard: Verificando token:', token);

    if (!token) {
      console.log('AuthGuard: Token não encontrado, redirecionando para login');
      this._router.navigate(['/auth/login']);
      return of(false);
    }

    console.log('AuthGuard: Verificando token com o backend...');
    return this.authService.verifyToken().pipe(
      map((res) => {
        console.log('AuthGuard: Resposta da verificação:', res);
        if (res.valid) {
          console.log('AuthGuard: Token válido, permitindo acesso');
          return true;
        }
        console.log('AuthGuard: Token inválido, executando logout');
        this.authService.logout();
        return false;
      }),
      catchError((error) => {
        console.error('AuthGuard: Erro na verificação do token:', error);
        this.authService.logout();
        return of(false);
      })
    );
  }
}

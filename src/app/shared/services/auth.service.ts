import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { AuthResponse, RegisterUser, TUrlApi, User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private urlApi: TUrlApi = 'http://localhost:3000/api';

  constructor() {
    console.log('AuthService inicializado');
  }

  register(register: RegisterUser): Observable<RegisterUser> {
    console.log('Tentando registrar usuário:', register);
    return this._httpClient.post<RegisterUser>(
      `${this.urlApi}/auth/register`,
      register
    );
  }

  login(user: User[]): Observable<AuthResponse> {
    console.log('Tentando fazer login com:', user);
    return this._httpClient
      .post<AuthResponse>(`${this.urlApi}/auth/login`, user)
      .pipe(
        tap((res) => {
          console.log('Resposta do login:', res, res.token, res.user);
          if (res.token && res.user) {
            console.log('Token recebido, armazenando...');
            localStorage.setItem('token', res.token);
            console.log('Token armazenado com sucesso');
          } else {
            console.warn('Nenhum token ou usuário recebido na resposta');
          }
        })
      );
  }

  verifyToken(): Observable<{ valid: boolean }> {
    const token = localStorage.getItem('token');
    console.log('Verificando token:', token);

    if (!token) {
      console.error('Token não encontrado no localStorage');
      throw new Error('Token não existe!');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log('Headers para verificação:', headers);

    return this._httpClient.get<{ valid: boolean }>(`${this.urlApi}/users/me`, {
      headers,
    });
  }

  logout() {
    console.log('Executando logout...');
    localStorage.removeItem('token');
    console.log('Token removido do localStorage');
    console.log('Redirecionando para a página de login...');
    this._router.navigate(['/auth/login']);
  }

  getUserScopes(): string[] {
    const token = localStorage.getItem('token');
    console.log('Obtendo scopes do usuário. Token:', token);

    if (!token) {
      console.warn('Nenhum token encontrado para obter scopes');
      return [];
    }

    try {
      const decodeToken: string[] = jwtDecode(token);
      console.log('Token decodificado:', decodeToken);
      return decodeToken;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return [];
    }
  }

  isAuthenticated(): boolean {
    const hasToken = !!localStorage.getItem('token');
    console.log('Verificando autenticação. Usuário autenticado:', hasToken);
    return hasToken;
  }
}

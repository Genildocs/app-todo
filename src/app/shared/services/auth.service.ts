import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, User } from '../interfaces/auth';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private urlApi = 'https://notesback-bzcn.onrender.com';

  constructor() {}

  login(user: User[]): Observable<AuthResponse> {
    return this._httpClient
      .post<AuthResponse>(`${this.urlApi}/api/users/login`, {
        ...user,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          return res;
        })
      );
  }

  verifyToken(): Observable<{ valid: boolean }> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token não existe!');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this._httpClient.get<{ valid: boolean }>(
      `${this.urlApi}/api/users`,
      { headers }
    );
  }

  logout() {
    if (localStorage.getItem('token')) localStorage.removeItem('token');
  }

  getUserScopes(): string[] {
    const token = localStorage.getItem('token');

    if (!token) return [];

    const decodeToken: any = jwtDecode(token);
    return decodeToken;
  }
}

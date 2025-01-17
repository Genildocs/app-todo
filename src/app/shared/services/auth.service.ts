import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, User, RegisterUser } from '../interfaces/auth';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private urlApi = 'https://notesback-bzcn.onrender.com';

  constructor() {}
  register(register: RegisterUser[]): Observable<RegisterUser> {
    return this._httpClient.post<RegisterUser>(
      `${this.urlApi}/api/users/register`,
      {
        ...register,
      }
    );
  }
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

    const decodeToken: string[] = jwtDecode(token);
    return decodeToken;
  }
}

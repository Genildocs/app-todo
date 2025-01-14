import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '../interfaces/auth';
import { map, Observable } from 'rxjs';

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
}

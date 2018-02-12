import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { AuthStore } from '../../stores/auth.store';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
  ) { }

  token(username: string, password: string) {
    return this.http.post<any>('/api/auth/token', { username, password })
      .toPromise()
      .then(({ token }) => {
        const { userId, username: tokenUsername, role } = jwtDecode(token);
        this.authStore.setToken(token);
        this.authStore.setUserId(userId);
        this.authStore.setUsername(tokenUsername);
        this.authStore.setRole(role);
      });
  }

  logout() {
    this.authStore.clear();
  }
}

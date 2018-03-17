import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable, action, computed } from 'mobx-angular';
import * as jwtDecode from 'jwt-decode';

import { Role } from '../constants/roles';

const LOCAL_STORAGE_KEY = 'auth';

@Injectable()
export class AuthService {
  // TODO: Handle token expiration and renovation
  @observable
  public token;

  @observable
  public userId;

  @observable
  public username;

  @observable
  public role;

  constructor(private http: HttpClient, private router: Router) {
    try {
      const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      this.token = auth.token;
      this.userId = auth.userId;
      this.username = auth.username;
      this.role = auth.role;
    } catch (err) {}
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        token: this.token,
        userId: this.userId,
        username: this.username,
        role: this.role,
      }),
    );
  }

  @action
  public async authenticate(username: string, password: string) {
    try {
      const {token} = await this.http.post<any>('/api/auth/token', {username, password})
        .toPromise();

      const {userId, username: tokenUsername, role} = jwtDecode(token);
      this.token = token;
      this.userId = userId;
      this.username = tokenUsername;
      this.role = role;
      this.saveToLocalStorage();
    } catch (err) {
      throw new Error('Wrong credentials');
    }
  }

  public async register(username: string, email: string, password: string) {
    await this.http.post<any>('/api/users', { username, email, password })
      .toPromise();
  }

  @computed
  public get isLoggedIn() {
    return !!this.token;
  }

  @computed
  public get isAdmin() {
    return this.role === Role.Admin;
  }

  @action
  public logout() {
    this.token = null;
    this.userId = null;
    this.username = null;
    this.role = null;

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    // Navigate to home
    this.router.navigate(['/']);
  }
}

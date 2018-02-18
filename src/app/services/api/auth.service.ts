import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, action } from 'mobx-angular';
import * as jwtDecode from 'jwt-decode';

const LOCAL_STORAGE_KEY = 'auth';

@Injectable()
export class AuthService {
  // TODO: Handle token expiration
  @observable
  token;
  @observable
  userId;
  @observable
  username;
  @observable
  role;

  constructor(private http: HttpClient) {
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
  async authenticate(username: string, password: string) {
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

  @action
  logout() {
    this.token = null;
    this.userId = null;
    this.username = null;
    this.role = null;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

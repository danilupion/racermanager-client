import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY = 'auth';

@Injectable()
export class AuthStore {
  // TODO: Handle token expiration
  @observable token;
  @observable userId;
  @observable username;
  @observable role;

  constructor() {
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

  @action setToken(token) {
    this.token = token;
    this.saveToLocalStorage();
  }

  @action setUserId(userId) {
    this.userId = userId;
    this.saveToLocalStorage();
  }

  @action setUsername(username) {
    this.username = username;
    this.saveToLocalStorage();
  }

  @action setRole(role) {
    this.role = role;
    this.saveToLocalStorage();
  }

  @action clear() {
    this.token = null;
    this.userId = null;
    this.username = null;
    this.role = null;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

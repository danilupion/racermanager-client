import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  create(username: string, email: string, password: string) {
    return this.http.post<any>('/api/users', { username, email, password });
  }
}

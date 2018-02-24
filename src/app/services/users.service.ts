import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  async create(username: string, email: string, password: string) {
    await this.http.post<any>('/api/users', { username, email, password })
      .toPromise();
  }
}

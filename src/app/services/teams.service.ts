import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, action } from 'mobx-angular';

@Injectable()
export class TeamsService {
  @observable
  teams;

  constructor(private http: HttpClient) { }

  @action
  async get() {
    const teams = await this.http.get<any>('/api/teams')
      .toPromise();

    this.teams = teams;
  }
}

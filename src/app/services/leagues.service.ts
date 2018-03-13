import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChampionshipsService } from './championships.service';
import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';
import { action } from 'mobx-angular';


interface LeagueUserModelType extends BaseModelType {
  money: number;
  email: string;
  username: string;
  userId: string;
}

export interface LeagueModelType extends BaseModelType {
  name: string;
  users: any;
}

@Injectable()
export class LeaguesService extends AbstractRestCollectionService<LeagueModelType> {
  protected name = 'League';

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    super(http);
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/leagues`;
  }

  @action
  public async addUser(league: LeagueModelType, userId: string, money: number) {
    try {
      const newItem = <LeagueUserModelType> await this.http.post<LeagueUserModelType>(`${this.getBaseUrl()}/${league.id}/users`, {
        user: userId,
        money: money,
      })
        .toPromise();

      league.users.push(newItem);
    } catch (err) {
      throw new Error(`${name} creation failed`);
    }
  }

  public async removeUser(league: LeagueModelType, user: LeagueUserModelType) {
    try {
      await this.http.delete<LeagueUserModelType>(`${this.getBaseUrl()}/${league.id}/users/${user.userId}`)
        .toPromise();

      league.users.remove(user);
    } catch (err) {
      throw new Error(`${name} creation failed`);
    }
  }

}


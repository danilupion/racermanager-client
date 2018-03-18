import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';
import { computed, reaction} from 'mobx';

import { SeasonsService } from './seasons.service';
import { BaseModelType } from './abstractRestCollection.service';
import { AuthService } from './auth.service';

export interface LeagueModelType extends BaseModelType {
  name: string;
  users: any;
}

@Injectable()
export class MyLeaguesService {
  @observable
  public items;

  @observable
  public selected;

  @computed
  get myUser() {
    return this.selected && this.selected.users
      .find(candidate => candidate.userId === this.authService.userId);
  }

  constructor(
    protected http: HttpClient,
    private authService: AuthService,
    private seasonsService: SeasonsService,
  ) {
    reaction(
      () => this.authService.isLoggedIn,
      this.update.bind(this),
    );
    reaction(
      () => this.seasonsService.selected,
      this.update.bind(this),
    );

    this.update();
  }

  public async update() {
    if (this.authService.isLoggedIn && this.seasonsService.selected) {
      await this.getLeagues();
    } else {
      this.items = [];
      this.selected = null;
    }
  }

  protected getBaseUrl() {
    return `/api/championships/${this.seasonsService.selected.championship}/seasons/${this.seasonsService.selected.name}/leagues`;
  }

  @action
  protected async getLeagues() {
    try {
      this.items = await this.http.get<LeagueModelType>(this.getBaseUrl())
        .toPromise();

      if (this.items.length > 0) {
        this.selected = this.items[0];
      }
    } catch (err) {
      this.items = null;
      throw new Error(`Leagues retrieval failed`);
    }
  }

  @action
  public setSelected(league: LeagueModelType) {
    this.selected = league;
  }
}

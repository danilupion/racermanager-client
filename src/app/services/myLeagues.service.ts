import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';
import { reaction } from 'mobx';

import { SeasonModelType, SeasonsService } from './seasons.service';
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
    if (this.authService.isLoggedIn) {
      await this.getLeagues();
    } else {
      this.items = null;
    }
  }

  protected getBaseUrl() {
    return `/api/championships/${this.seasonsService.selected.championship}/seasons/${this.seasonsService.selected.name}/leagues`;
  }

  @action
  protected async getLeagues() {
    try {
      this.items = await this.http.get<SeasonModelType>(this.getBaseUrl())
        .toPromise();
    } catch (err) {
      this.items = null;
      throw new Error(`Leagues retrieval failed`);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable, computed } from 'mobx-angular';
import { reaction, toJS } from 'mobx';

import { SeasonsService } from './seasons.service';
import { BaseModelType } from './abstractRestCollection.service';
import { AuthService } from './auth.service';
import { DriverModelType } from './drivers.service';

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

  @observable
  protected wantedDrivers = [null, null];

  @computed
  get hasPendingChanges() {
    return this.wantedDrivers.some(driver => driver !== null);
  }

  @computed
  get myUser() {
    if (!this.selected) {
      return null;
    }

    const user = this.selected && this.selected.users
      .find(candidate => candidate.userId === this.authService.userId);

    return toJS(user);
  }

  @computed
  get myDrivers() {
    if (!this.myUser) {
      return [];
    }

    return this.myUser && this.myUser.drivers.reduce(
      (accumulated, current, index) => [...accumulated, this.wantedDrivers[index] ? this.wantedDrivers[index] : current],
      [],
    );
  }

  @computed
  get myMoney() {
    return this.myUser && this.myUser.money;
  }

  @computed
  get myTotal() {
    return this.myDrivers.reduce(
      (accumulated, current) => accumulated + (current && current.value || 0),
      this.myMoney,
    );
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
  public setDriver(position: number, driver: DriverModelType) {
    this.wantedDrivers[position] = driver;
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
    this.wantedDrivers = [null, null];
  }
}

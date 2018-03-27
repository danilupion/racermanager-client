import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable, computed } from 'mobx-angular';
import { reaction, toJS } from 'mobx';

import { SeasonsService } from './seasons.service';
import { BaseModelType } from './abstractRestCollection.service';
import { AuthService } from './auth.service';
import { DriverModelType } from './drivers.service';

export interface LeagueUserModelType extends BaseModelType {
  money: number;
  points: number;
  userId: string;
  drivers: string|null[];
}

export interface LeagueModelType extends BaseModelType {
  name: string;
  users: LeagueUserModelType;
}

@Injectable()
export class MyLeaguesService {
  @observable
  public items;

  @observable
  public selected;

  @observable
  protected wantedDrivers = [null, null];

  @computed({keepAlive: true})
  get hasPendingChanges() {
    return this.wantedDrivers && this.wantedDrivers.some(driver => driver !== null);
  }

  @computed({keepAlive: true})
  get myUser() {
    if (!this.selected) {
      return null;
    }

    const user = this.selected && this.selected.users
      .find(candidate => candidate.userId === this.authService.userId);

    return toJS(user);
  }

  @computed({keepAlive: true})
  get myDrivers() {
    if (!this.myUser) {
      return [];
    }

    return this.myUser.drivers.reduce(
      (accumulated, current, index) => [...accumulated, this.wantedDrivers[index] ? this.wantedDrivers[index] : current],
      [],
    );
  }

  @computed({keepAlive: true})
  get myMoney() {
    if (!this.myUser) {
      return 0;
    }

    return this.myUser.drivers.reduce(
      (accumulated, current, index) => {
        const wantedDriver = this.wantedDrivers[index];
        return accumulated - (current && current.price || 0) - (wantedDriver && wantedDriver.price || 0);
      },
      this.myUser.money,
    );
  }

  @computed({keepAlive: true})
  get myBroker() {
    return this.myDrivers.reduce(
      (accumulated, current) => accumulated + (current && current.price || 0),
      this.myMoney,
    );
  }

  @computed({keepAlive: true})
  get myPoints() {
    return this.myUser && this.myUser.points;
  }

  @computed({keepAlive: true})
  get hasLeagues() {
    return this.items && this.items.length > 0;
  }

  @computed({keepAlive: true})
  get currentTradePercentageFee() {
    return this.seasonsService.selected && this.seasonsService.selected.currentTradePercentageFee || 0;
  }

  @computed({keepAlive: true})
  get currentTradePercentageCost() {
    return this.currentTradePercentageFee * this.myBroker;
  }

  @computed({keepAlive: true})
  get availableMoney() {
    return this.myMoney - this.currentTradePercentageCost;
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

  public canBuyDriver(driver: DriverModelType, position: number) {
    const investableMoney = this.myMoney - this.currentTradePercentageCost;

    return !this.myDrivers.some(candidate => candidate && candidate.driverId === driver.driverId)
      && investableMoney - driver.price + (this.myDrivers[position] && this.myDrivers[position].price || 0) >= 0;
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

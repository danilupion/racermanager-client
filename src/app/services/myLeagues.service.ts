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
  drivers: (string|null)[];
}

export interface LeagueModelType extends BaseModelType {
  name: string;
  users: LeagueUserModelType[];
}

@Injectable()
export class MyLeaguesService {
  @observable
  public items;

  @observable
  public selectedIndex = null;

  @observable
  protected wantedDrivers = [null, null];

  @computed({ keepAlive: true})
  get selected() {
    return this.items && this.selectedIndex !== null
      ? this.items[this.selectedIndex]
      : null;
  }

  @computed({ keepAlive: true })
  get hasPendingChanges() {
    return this.wantedDrivers && this.wantedDrivers.some(driver => driver !== null);
  }

  @computed({ keepAlive: true })
  get myUser() {
    if (!this.selected) {
      return null;
    }

    const user = this.selected && this.selected.users
      .find(candidate => candidate.userId === this.authService.userId);

    return toJS(user);
  }

  @computed({ keepAlive: true })
  get myDrivers() {
    if (!this.myUser) {
      return [];
    }

    return this.myUser.drivers.reduce(
      (accumulated, current, index) => [...accumulated, this.wantedDrivers[index] ? this.wantedDrivers[index] : current],
      [],
    );
  }

  @computed({ keepAlive: true })
  get myMoney() {
    if (!this.myUser) {
      return 0;
    }

    return Number.parseFloat(
      this.myUser.drivers.reduce(
        (accumulated, current, index) => {
          const wantedDriver = this.wantedDrivers[index];
          const diff = wantedDriver
            ? wantedDriver.price - (current && current.price || 0)
            : 0;

          return accumulated - diff;
        },
        this.myUser.money,
      ).toFixed(3),
    );
  }

  @computed({ keepAlive: true })
  get myBroker() {
    return Number.parseFloat(
      this.myDrivers.reduce(
        (accumulated, driver) => accumulated + (driver && driver.price || 0),
        this.myMoney,
      ).toFixed(3),
    );
  }

  @computed({ keepAlive: true })
  get myPoints() {
    return this.myUser && this.myUser.points;
  }

  @computed({ keepAlive: true })
  get hasLeagues() {
    return this.items && this.items.length > 0;
  }

  @computed({ keepAlive: true })
  get currentTradeFeePercentage() {
    return this.seasonsService.selected && this.seasonsService.selected.currentTradeFeePercentage || 0;
  }

  @computed({ keepAlive: true })
  get currentTradeFeeCost() {
    return Number.parseFloat((this.currentTradeFeePercentage * this.myBroker).toFixed(3));
  }

  @computed({ keepAlive: true })
  get availableMoney() {
    return this.myMoney - this.currentTradeFeeCost;
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

  private parseLeague(league: LeagueModelType) {
    return {
      ...league,
      users: league.users.map(user => ({
        ...user,
        drivers: user.drivers.map(
          driverId => driverId === null
            ? null
            : this.seasonsService.selected.drivers.find(candidate => candidate.driverId === driverId),
        ),
      })),
    };
  }

  public async update() {
    if (this.authService.isLoggedIn && this.seasonsService.selected) {
      await this.getLeagues();
    } else {
      this.items = [];
      this.selectedIndex = null;
    }
  }

  public canBuyDriver(driver: DriverModelType, position: number) {
    const investableMoney = this.myMoney - this.currentTradeFeeCost;

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
      this.items = (
        await this.http.get<LeagueModelType[]>(this.getBaseUrl())
        .toPromise()
      ).map(this.parseLeague.bind(this));

      if (this.items.length > 0) {
        this.selectedIndex = 0;
      }
    } catch (err) {
      this.items = null;
      throw new Error('Leagues retrieval failed');
    }
  }

  @action
  public setSelected(league: LeagueModelType) {
    this.selectedIndex = this.items.findIndex(candidate => candidate === league);
    this.discard();
  }

  @action
  public discard() {
    this.wantedDrivers = [null, null];
  }

  @action
  public async saveDrivers() {
    try {
      const league = await this.http.put<LeagueModelType>(`${this.getBaseUrl()}/${this.selected.id}/drivers`, {
        drivers: this.myDrivers.map(driver => driver.driverId),
        tradeFee: this.currentTradeFeeCost,
        resultingMoney: Number.parseFloat((this.myMoney - this.currentTradeFeeCost).toFixed(3)),
      }).toPromise();

      this.items.set(this.selectedIndex, this.parseLeague(league));
      this.discard();
    } catch (err) {
      throw new Error('Unable to save drivers');
    }
  }
}

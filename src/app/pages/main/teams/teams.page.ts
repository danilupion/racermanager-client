import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPageComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;
  private seasonTeamsObserverDisposer;

  public teams = [];
  public displayedColumns = ['Team', 'TeamName', 'Drivers', 'Points', 'Factor'];

  constructor(
    public seasonsService: SeasonsService,
    private championshipsService: ChampionshipsService,
  ) { }

  public getDriverCode(driverId: string) {
    const driver = this.getDriver(driverId);
    return driver.code;
  }

  public getTeamImg(teamCode: string) {
    const teamAsset = teamCode.replace(/ /g, '').toLowerCase();
    return `../../../../assets/teams/${teamAsset}.jpg`;
  }

  public getTeamPoints(driverIds: string[]) {
    const drivers = driverIds.map((driverId) => {
      return this.getDriver(driverId);
    });
    return drivers.reduce((acc, driver) => {
      return acc + driver.points;
    }, 0);
  }

  public getTeamFactor(driverIds: string[]) {
    return 2;
  }

  public getDriver(driverId: string) {
    return this.seasonsService.selected.drivers.find((driverCandidate) => {
      return driverCandidate.driverId === driverId;
    });
  }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) { }
  }

  private initializeModelsFromSeasonTeams() {
    this.teams = this.seasonsService.selected
      ? this.seasonsService.selected.teams.toJS()
      : [];
  }

  public ngOnInit(): void {
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.update(),
    );

    this.seasonTeamsObserverDisposer = observe(
      this.seasonsService,
      'selected',
      () => this.initializeModelsFromSeasonTeams(),
    );

    this.initializeModelsFromSeasonTeams();
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
    this.seasonTeamsObserverDisposer();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './teams.page.html',
})
export class TeamsPageComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;
  private seasonTeamsObserverDisposer;

  public teams = [];
  displayedColumns = ['Team', 'Drivers', 'Points', 'Factor'];

  constructor(
    public seasonsService: SeasonsService,
    private championshipsService: ChampionshipsService,
  ) {
    console.error('TEAMS, ', this.teams);
   }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) {}
  }

  private initializeModelsFromSeasonTeams() {
    this.teams = this.seasonsService.selected
      ? this.seasonsService.selected.teams.toJS()
      : [];

    console.log(this.teams);
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
    this.seasonTeamsObserverDisposer();
  }
}

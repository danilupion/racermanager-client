import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPageComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;
  private seasonTeamsObserverDisposer;

  public drivers = [];
  public displayedColumns = ['Driver', 'Points', 'Price'];

  constructor(
    public seasonsService: SeasonsService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) { }
  }

  private initializeModelsFromSeasonTeams() {
    this.drivers = this.seasonsService.selected
      ? this.seasonsService.selected.drivers.toJS()
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

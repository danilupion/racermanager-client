import { Component, OnDestroy, OnInit } from '@angular/core';
import { reaction } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPageComponent implements OnInit, OnDestroy {
  private selectedSeasonReactionDisposer;

  public drivers = [];
  public displayedColumns = ['Driver', 'Points', 'Price'];

  constructor(
    public seasonsService: SeasonsService,
  ) { }

  private initializeModelsFromSeasonTeams() {
    this.drivers = this.seasonsService.selected
      ? this.seasonsService.selected.drivers.toJS()
      : [];
  }

  public ngOnInit(): void {
    this.selectedSeasonReactionDisposer = reaction(
      () => this.seasonsService.selected,
      this.initializeModelsFromSeasonTeams.bind(this),
    );

    this.initializeModelsFromSeasonTeams();
  }

  public ngOnDestroy(): void {
    this.selectedSeasonReactionDisposer();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './teams.page.html',
})
export class TeamsPageComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;


  public teams = [];
  displayedColumns = ['Team', 'Drivers', 'Points', 'Factor'];

  constructor(
    public seasonService: SeasonsService,
    private championshipsService: ChampionshipsService,
  ) {
    console.error('TEAMS, ', this.teams);
   }

  private async update() {
    try {
      await this.seasonService.update();
    } catch (err) {}
  }

  ngOnInit(): void {
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.update(),
    );

    this.teams = this.seasonService
              && this.seasonService.selected
              && this.seasonService.selected.teams;
    console.error('TEAMS, ', this.teams);
  }

  ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

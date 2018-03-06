import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './teams.page.html',
})
export class TeamsPageComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;

  constructor(
    public seasonService: SeasonsService,
    private championshipsService: ChampionshipsService,
  ) { }

  ngOnInit(): void {
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.seasonService.update(),
    );
  }

  ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

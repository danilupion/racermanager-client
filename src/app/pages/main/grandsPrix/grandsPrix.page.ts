import { Component, OnDestroy, OnInit } from '@angular/core';
import { observe } from 'mobx';
import * as moment from 'moment';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './grandsPrix.page.html',
  styleUrls: ['./grandsPrix.page.scss'],
})
export class GrandsPrixComponent implements OnInit, OnDestroy {
  private selectedChampionshipObserverDisposer;
  private seasonGrandsPrixObserverDisposer;

  public grandsPrix = [];
  public displayedColumns = ['Name', 'Circuit', 'Practice1', 'Practice2', 'Practice3', 'Qualifying', 'Race'];

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
    this.grandsPrix = this.seasonsService.selected
      ? this.seasonsService.selected.grandsPrix.toJS()
      : [];
  }

  public getLocalTime(utcTime: string) {
    return moment(utcTime).local().format('DD-MM-YYYY HH:mm:ss');
  }

  public ngOnInit(): void {
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.update(),
    );

    this.seasonGrandsPrixObserverDisposer = observe(
      this.seasonsService,
      'selected',
      () => this.initializeModelsFromSeasonTeams(),
    );

    this.initializeModelsFromSeasonTeams();
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
    this.seasonGrandsPrixObserverDisposer();
  }
}

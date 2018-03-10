import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { LeagueModelType, LeaguesService } from '../../../services/leagues.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './leaguesAdmin.page.html',
})
export class LeaguesAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Leagues';

  public fields = [
    'name',
  ];

  private selectedChampionshipObserverDisposer;

  public crud: CrudType<LeagueModelType> = {
    getAll: () => this.leaguesService.get(),
    create: (league) => this.leaguesService.create(league),
    update: (league) => this.leaguesService.update(league),
    remove: (league) => this.leaguesService.remove(league),
  };

  constructor(
    public leaguesService: LeaguesService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.leaguesService.get();
    } catch (err) { }
  }

  public ngOnInit(): void {
    this.update();
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.update(),
    );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

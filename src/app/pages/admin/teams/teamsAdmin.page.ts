import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { TeamModelType, TeamsService } from '../../../services/teams.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './teamsAdmin.page.html',
})
export class TeamsAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Teams';

  public columns = ['name', 'countryCode'];

  private selectedChampionshipObserverDisposer;

  crud: CrudType<TeamModelType> = {
    getAll: () => this.teamsService.get(),
    create: (team) => this.teamsService.create(team),
    update: (team) => this.teamsService.update(team),
    remove: (team) => this.teamsService.remove(team),
  };

  constructor(
    public teamsService: TeamsService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.teamsService.get();
    } catch (err) { }
  }

  ngOnInit(): void {
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

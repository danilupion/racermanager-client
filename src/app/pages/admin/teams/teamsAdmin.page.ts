import { Component, OnInit, OnDestroy } from '@angular/core';
import {observe} from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { TeamModelType, TeamsService } from '../../../services/teams.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  selector: 'rm-admin-teams',
  templateUrl: './teamsAdmin.page.html',
})
export class TeamsAdminPageComponent implements OnInit, OnDestroy {
  columns = ['name', 'countryCode'];

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

  ngOnInit(): void {
    this.teamsService.get();
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.teamsService.get(),
    );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

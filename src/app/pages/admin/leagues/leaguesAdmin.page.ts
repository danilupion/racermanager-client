import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { reaction } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { LeagueModelType, LeaguesService } from '../../../services/leagues.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { LeagueUsersAdminDialogComponent } from './leagueUsersAdminDialog/leagueUsersAdminDialog.component';

@Component({
  templateUrl: './leaguesAdmin.page.html',
})
export class LeaguesAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Leagues';

  public fields = [
    'name',
    {
      name: 'Usuarios',
      editable: false,
      listValueGetter: (model) => `${model.users.length} users`,
      onListClick: (model) => {
        const dialogRef = this.dialog.open(LeagueUsersAdminDialogComponent, {
          width: '400px',
          data: {
            league: model,
          },
        });
      },
    },
  ];

  private selectedChampionshipReactionDisposer;

  public crud: CrudType<LeagueModelType> = {
    getAll: () => this.leaguesService.get(),
    create: (league) => this.leaguesService.create(league),
    update: (league) => this.leaguesService.update(league),
    remove: (league) => this.leaguesService.remove(league),
  };

  constructor(
    public leaguesService: LeaguesService,
    private championshipsService: ChampionshipsService,
    private dialog: MatDialog,
  ) { }

  private async update() {
    try {
      await this.leaguesService.get();
    } catch (err) { }
  }

  public ngOnInit(): void {
    this.update();
    this.selectedChampionshipReactionDisposer = reaction(
      () => this.championshipsService.selected,
      this.update.bind(this),
    );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipReactionDisposer();
  }
}

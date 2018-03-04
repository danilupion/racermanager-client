import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { SeasonTeamModelType, SeasonsService } from '../../../services/seasons.service';
import { TeamsService } from '../../../services/teams.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { alphabeticalOrder } from '../../../utils/sorting';

@Component({
  templateUrl: './seasonTeamsAdmin.page.html',
})
export class SeasonTeamsAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Season Teams';

  public fields = [];

  private selectedChampionshipObserverDisposer;

  public crud: CrudType<SeasonTeamModelType> = {
    getAll: () => this.seasonsService.update(),
    create: (team) => this.seasonsService.createTeam(team),
    update: (team) => this.seasonsService.updateTeam(team),
    remove: (team) => this.seasonsService.removeTeam(team),
  };

  constructor(
    public seasonsService: SeasonsService,
    private teamsService: TeamsService,
    private championshipsService: ChampionshipsService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.selectedChampionshipObserverDisposer = observe(
        this.championshipsService,
        'selected',
        () => this.seasonsService.update(),
      );

      await this.teamsService.get();

      const teamOptions = this.teamsService.items
        .sort((team1, team2) => alphabeticalOrder(team1.name, team2.name))
        .map(team => ({
          value: team.id,
          text: `${team.name} (${team.countryCode})`,
        }));

      this.fields = [
        {
          property: 'team',
          options: teamOptions,
          valueGetter: (model) => model.team.name,
        },
        {
          property: 'name',
          name: 'Season Name',
        },
        {
          property: 'countryCode',
          name: 'Country Code',
        },
      ];
    } catch (err) { }
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

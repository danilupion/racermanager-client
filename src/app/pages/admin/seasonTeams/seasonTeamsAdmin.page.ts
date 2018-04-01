import { Component, OnInit, OnDestroy } from '@angular/core';
import { reaction } from 'mobx';

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

  private selectedChampionshipReactionDisposer;

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
      this.selectedChampionshipReactionDisposer = reaction(
        () => this.championshipsService.selected,
        this.seasonsService.update.bind(this),
      );

      await this.teamsService.get();

      const teamOptions = this.teamsService.items
        .sort((team1, team2) => alphabeticalOrder(team1.name, team2.name))
        .map(team => ({
          value: team.id,
          text: `${team.name} (${team.countryCode})`,
        }));

      const driverOptions = this.seasonsService.selected.drivers
        .sort((driver1, driver2) => alphabeticalOrder(driver1.name, driver2.name))
        .map(driver => ({
          value: driver.driverId,
          text: `${driver.name} (${driver.code})`,
        }));

      this.fields = [
        {
          property: 'teamId',
          name: 'Team',
          options: teamOptions,
          listValueGetter: (model) => this.teamsService.items.find(candidate => candidate.id === model.teamId).name,
        },
        {
          property: 'name',
          name: 'Season Name',
        },
        {
          property: 'countryCode',
          name: 'Country Code',
        },
        {
          property: 'driverIds',
          name: 'Drivers',
          options: driverOptions,
          listValueGetter: (model) => model.driverIds
            .map(driverId => this.seasonsService.selected.drivers.find(candidate => candidate.driverId === driverId))
            .map(driver => `${driver.name}`).join(', '),
          multiple: true,
        },
      ];
    } catch (err) { }
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipReactionDisposer();
  }
}

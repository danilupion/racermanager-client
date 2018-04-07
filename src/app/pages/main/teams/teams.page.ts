import { Component } from '@angular/core';

import { SeasonsService } from '../../../services/seasons.service';
import { TeamModelType } from '../../../services/teams.service';

@Component({
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPageComponent {
  public displayedColumns = ['Team', 'TeamName', 'Drivers', 'Points', 'Factor'];

  constructor(
    public seasonsService: SeasonsService,
  ) { }

  public getTeamImg(team: TeamModelType) {
    const teamAsset = team.code.replace(/ /g, '').toLowerCase();
    return `../../../../assets/teams/${team.championship}/${teamAsset}.jpg`;
  }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) { }
  }
}

import { Component } from '@angular/core';

import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPageComponent {
  public teams = [];
  public displayedColumns = ['Team', 'TeamName', 'Drivers', 'Points', 'Factor'];

  constructor(
    public seasonsService: SeasonsService,
  ) { }

  public getTeamImg(teamCode: string) {
    const teamAsset = teamCode.replace(/ /g, '').toLowerCase();
    return `../../../../assets/teams/${teamAsset}.jpg`;
  }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) { }
  }
}

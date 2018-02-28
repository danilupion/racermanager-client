import { Component, OnInit } from '@angular/core';

import { TeamsService } from '../../../services/teams.service';

@Component({
  selector: 'rm-admin-teams',
  templateUrl: './teamsAdmin.page.html',
})
export class TeamsAdminPageComponent implements OnInit {
  columns = ['name', 'countryCode'];

  create = (team) => this.teamsService.create(team);

  remove = (team) => this.teamsService.remove(team);

  update = (team) => this.teamsService.update(team);

  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.get();
  }
}

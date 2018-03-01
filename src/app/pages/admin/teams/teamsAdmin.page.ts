import { Component, OnInit } from '@angular/core';

import { CrudType } from '../../../components/crud/crud.component';
import { TeamModelDriver, TeamsService } from '../../../services/teams.service';

@Component({
  selector: 'rm-admin-teams',
  templateUrl: './teamsAdmin.page.html',
})
export class TeamsAdminPageComponent implements OnInit {
  columns = ['name', 'countryCode'];

  crud: CrudType<TeamModelDriver> = {
    getAll: () => this.teamsService.get(),
    create: (team) => this.teamsService.create(team),
    update: (team) => this.teamsService.update(team),
    remove: (team) => this.teamsService.remove(team),
  };

  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.get();
  }
}

import { Component } from '@angular/core';

import { MyLeaguesService } from '../../services/myLeagues.service';

@Component({
  selector: 'rm-league-manager',
  templateUrl: './leagueManager.component.html',
  styleUrls: ['./leagueManager.component.scss'],
})
export class LeagueManagerComponent {
  constructor(
    public myLeaguesService: MyLeaguesService,
  ) {}
}

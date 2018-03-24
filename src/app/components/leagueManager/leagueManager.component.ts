import { Component } from '@angular/core';
import { computed } from 'mobx-angular';

import { MyLeaguesService } from '../../services/myLeagues.service';
import { AuthService } from '../../services/auth.service';

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

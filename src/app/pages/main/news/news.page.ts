import { Component } from '@angular/core';
import { observe } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';
import { MyLeaguesService } from '../../../services/myLeagues.service';

@Component({
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPageComponent {

  constructor(
    public seasonsService: SeasonsService,
    private myLeaguesService: MyLeaguesService,
  ) {
    console.log('LEAGUE+++++++++++++++++++', this.myLeaguesService);
   }

}

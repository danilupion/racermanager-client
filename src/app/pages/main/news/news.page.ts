import { Component } from '@angular/core';
import { observe, reaction, toJS } from 'mobx';

import { ChampionshipsService } from '../../../services/championships.service';
import { SeasonsService } from '../../../services/seasons.service';
import { MyLeaguesService } from '../../../services/myLeagues.service';

@Component({
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPageComponent {

  transactions = [];
  constructor(
    public seasonsService: SeasonsService,
    private myLeaguesService: MyLeaguesService,
  ) {
    console.log('LEAGUE+++++++++++++++++++', this.myLeaguesService);

    reaction(
      () => this.myLeaguesService.selected,
      (value) => {
        this.transactions = toJS(this.myLeaguesService.selected.transactions);
        console.log('TRANSACTIONS2', this.myLeaguesService.selected.transactions);
        console.log('TRANSACTIONS', this.transactions);
        // console.log('LENGTH', this.transactions.length);
      });
  }
}

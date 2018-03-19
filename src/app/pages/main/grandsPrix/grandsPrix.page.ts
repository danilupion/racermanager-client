import { Component } from '@angular/core';
import * as moment from 'moment';

import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './grandsPrix.page.html',
  styleUrls: ['./grandsPrix.page.scss'],
})
export class GrandsPrixComponent {
  public displayedColumns = ['Name', 'Circuit', 'Practice1', 'Practice2', 'Practice3', 'Qualifying', 'Race'];

  constructor(
    public seasonsService: SeasonsService,
  ) { }

  private async update() {
    try {
      await this.seasonsService.update();
    } catch (err) { }
  }

  public getLocalTime(utcTime: string) {
    return moment(utcTime).local().format('DD-MM-YYYY HH:mm:ss');
  }
}

import { Component } from '@angular/core';

import { SeasonsService } from '../../../services/seasons.service';

@Component({
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPageComponent {
  public displayedColumns = ['Driver', 'Points', 'Price'];

  constructor(
    public seasonsService: SeasonsService,
  ) { }
}

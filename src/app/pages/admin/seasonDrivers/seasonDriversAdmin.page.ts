import { Component, OnInit, OnDestroy } from '@angular/core';
import { reaction } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { SeasonTeamModelType, SeasonsService } from '../../../services/seasons.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { alphabeticalOrder } from '../../../utils/sorting';
import { DriversService } from '../../../services/drivers.service';

@Component({
  templateUrl: './seasonDriversAdmin.page.html',
})
export class SeasonDriversAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Season Teams';

  public fields = [];

  private selectedChampionshipReactionDisposer;

  public crud: CrudType<SeasonTeamModelType> = {
    getAll: () => this.seasonsService.update(),
    create: (driver) => this.seasonsService.createDriver(driver),
    update: (driver) => this.seasonsService.updateDriver(driver),
    remove: (driver) => this.seasonsService.removeDriver(driver),
  };

  constructor(
    public seasonsService: SeasonsService,
    private driversService: DriversService,
    private championshipsService: ChampionshipsService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.selectedChampionshipReactionDisposer = reaction(
        () => this.championshipsService.selected,
        this.seasonsService.update.bind(this),
      );

      await this.driversService.get();

      const driverOptions = this.driversService.items
        .sort((driver1, driver2) => alphabeticalOrder(driver1.name, driver2.name))
        .map(driver => ({
          value: driver.id,
          text: `${driver.name} (${driver.code})`,
        }));

      this.fields = [
        {
          property: 'driverId',
          name: 'Driver',
          options: driverOptions,
          listValueGetter: (model) => this.driversService.items.find(candidate => candidate.id === model.driverId).name,
        },
        {
          property: 'initialValue',
          name: 'Initial Value',
        },
      ];
    } catch (err) { }
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipReactionDisposer();
  }
}

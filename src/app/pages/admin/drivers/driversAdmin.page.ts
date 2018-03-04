import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { DriverModelType, DriversService } from '../../../services/drivers.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './driversAdmin.page.html',
})
export class DriversAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Drivers';

  public fields = [
    'name',
    'code',
    {
      property: 'countryCode',
      name: 'Country Code',
    },
  ];

  private selectedChampionshipObserverDisposer;

  public crud: CrudType<DriverModelType> = {
    getAll: () => this.driversService.get(),
    create: (driver) => this.driversService.create(driver),
    update: (driver) => this.driversService.update(driver),
    remove: (driver) => this.driversService.remove(driver),
  };

  constructor(
    public driversService: DriversService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.driversService.get();
    } catch (err) { }
  }

  public ngOnInit(): void {
    this.update();
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.update(),
      );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

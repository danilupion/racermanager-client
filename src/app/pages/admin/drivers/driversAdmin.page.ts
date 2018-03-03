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

  public columns = ['name', 'code', 'countryCode'];

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

  public ngOnInit(): void {
    this.driversService.get();
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.driversService.get(),
      );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

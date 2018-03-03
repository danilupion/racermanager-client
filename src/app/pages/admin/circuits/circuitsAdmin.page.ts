import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { CircuitModelType, CircuitsService } from '../../../services/circuits.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './circuitsAdmin.page.html',
})
export class CircuitsAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Circuits';

  public columns = ['name', 'countryCode', 'latitude', 'longitude'];

  private selectedChampionshipObserverDisposer;

  public crud: CrudType<CircuitModelType> = {
    getAll: () => this.circuitsService.get(),
    create: (circuit) => this.circuitsService.create(circuit),
    update: (circuit) => this.circuitsService.update(circuit),
    remove: (circuit) => this.circuitsService.remove(circuit),
  };

  constructor(
    public circuitsService: CircuitsService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.circuitsService.get();
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

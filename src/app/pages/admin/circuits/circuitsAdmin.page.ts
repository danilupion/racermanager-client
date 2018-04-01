import { Component, OnInit, OnDestroy } from '@angular/core';
import { reaction } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { CircuitModelType, CircuitsService } from '../../../services/circuits.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './circuitsAdmin.page.html',
})
export class CircuitsAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Circuits';

  public fields = [
    'name',
    {
      property: 'countryCode',
      name: 'Country Code',
    },
    'latitude',
    'longitude',
  ];

  private selectedChampionshipReactionDisposer;

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
    this.selectedChampionshipReactionDisposer = reaction(
      () => this.championshipsService.selected,
      this.update.bind(this),
    );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipReactionDisposer();
  }
}

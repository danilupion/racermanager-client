import { Component, OnInit, OnDestroy } from '@angular/core';
import { reaction } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { GrandPrixModelType, GrandsPrixService } from '../../../services/grandsPrix.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './grandsPrixAdmin.page.html',
})
export class GrandsPrixAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Grands Prix';

  public fields = [
    'name',
    {
      property: 'countryCode',
      name: 'Country Code',
    },
  ];

  private selectedChampionshipReactionDisposer;

  public crud: CrudType<GrandPrixModelType> = {
    getAll: () => this.grandsPrixService.get(),
    create: (circuit) => this.grandsPrixService.create(circuit),
    update: (circuit) => this.grandsPrixService.update(circuit),
    remove: (circuit) => this.grandsPrixService.remove(circuit),
  };

  constructor(
    public grandsPrixService: GrandsPrixService,
    private championshipsService: ChampionshipsService,
  ) { }

  private async update() {
    try {
      await this.grandsPrixService.get();
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

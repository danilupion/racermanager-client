import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { GrandPrixModelType, GrandsPrixService } from '../../../services/grandsPrix.service';
import { ChampionshipsService } from '../../../services/championships.service';

@Component({
  templateUrl: './grandsPrixAdmin.page.html',
})
export class GrandsPrixAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Grands Prix';

  public columns = ['name', 'countryCode'];

  private selectedChampionshipObserverDisposer;

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

  public ngOnInit(): void {
    this.grandsPrixService.get();
    this.selectedChampionshipObserverDisposer = observe(
      this.championshipsService,
      'selected',
      () => this.grandsPrixService.get(),
      );
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

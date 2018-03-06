import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';

import { CrudType } from '../../../components/crud/crud.component';
import { SeasonGrandPrixModelType, SeasonsService } from '../../../services/seasons.service';
import { CircuitsService } from '../../../services/circuits.service';
import { GrandsPrixService } from '../../../services/grandsPrix.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { alphabeticalOrder } from '../../../utils/sorting';

@Component({
  templateUrl: './seasonGrandsPrixAdmin.page.html',
})
export class SeasonGrandsPrixAdminPageComponent implements OnInit, OnDestroy {
  public title = 'Season Grands Prix';

  public fields = [];

  private selectedChampionshipObserverDisposer;

  public crud: CrudType<SeasonGrandPrixModelType> = {
    getAll: () => this.seasonsService.update(),
    create: (grandPrix) => this.seasonsService.createGrandPrix(grandPrix),
    update: (grandPrix) => this.seasonsService.updateGrandPrix(grandPrix),
    remove: (grandPrix) => this.seasonsService.removeGrandPrix(grandPrix),
  };

  constructor(
    public seasonsService: SeasonsService,
    private circuitsService: CircuitsService,
    private grandsPrixService: GrandsPrixService,
    private championshipsService: ChampionshipsService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.selectedChampionshipObserverDisposer = observe(
        this.championshipsService,
        'selected',
        () => this.seasonsService.update(),
      );

      await Promise.all([this.circuitsService.get(), this.grandsPrixService.get()]);

      const circuitsOptions = this.circuitsService.items
        .sort((circuit1, circuit2) => alphabeticalOrder(circuit1.name, circuit2.name))
        .map(circuit => ({
          value: circuit.id,
          text: `${circuit.name} (${circuit.countryCode})`,
        }));

      const grandsPrixOptions = this.grandsPrixService.items
        .sort((grandPrix1, grandPrix2) => alphabeticalOrder(grandPrix1.name, grandPrix2.name))
        .map(grandPrix => ({
          value: grandPrix.id,
          text: `${grandPrix.name} (${grandPrix.countryCode})`,
        }));

      this.fields = [
        {
          property: 'grandPrixId',
          name: 'Grand Prix',
          options: grandsPrixOptions,
          listValueGetter: (model) => this.grandsPrixService.items.find(candidate => candidate.id === model.grandPrixId).name,
        },
        {
          property: 'circuitId',
          name: 'Circuit',
          options: circuitsOptions,
          listValueGetter: (model) => this.circuitsService.items.find(candidate => candidate.id === model.circuit.circuitId).name,
          editValueGetter: (model) => model.circuit.circuitId,
        },
        {
          property: 'practice1UTC',
          name: 'Practice 1',
        },
        {
          property: 'practice2UTC',
          name: 'Practice 2',
        },
        {
          property: 'practice3UTC',
          name: 'Practice 3',
        },
        {
          property: 'qualifyingUTC',
          name: 'Qualifying',
        },
        {
          property: 'raceUTC',
          name: 'Race',
        },
      ];
    } catch (err) { }
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

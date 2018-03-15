import { Component, OnInit, OnDestroy } from '@angular/core';
import { observe } from 'mobx';
import * as moment from 'moment';

import { CrudType } from '../../../components/crud/crud.component';
import { SeasonGrandPrixModelType, SeasonsService } from '../../../services/seasons.service';
import { CircuitsService } from '../../../services/circuits.service';
import { GrandsPrixService } from '../../../services/grandsPrix.service';
import { ChampionshipsService } from '../../../services/championships.service';
import { alphabeticalOrder } from '../../../utils/sorting';

const formatDateString = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');


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
          listValueGetter: (model) => formatDateString(model.practice1UTC),
        },
        {
          property: 'practice2UTC',
          name: 'Practice 2',
          listValueGetter: (model) => formatDateString(model.practice2UTC),

        },
        {
          property: 'practice3UTC',
          name: 'Practice 3',
          listValueGetter: (model) => formatDateString(model.practice3UTC),

        },
        {
          property: 'qualifyingUTC',
          name: 'Qualifying',
          listValueGetter: (model) => formatDateString(model.qualifyingUTC),

        },
        {
          property: 'raceUTC',
          name: 'Race',
          listValueGetter: (model) => formatDateString(model.raceUTC),

        },
      ];
    } catch (err) { }
  }

  public ngOnDestroy(): void {
    this.selectedChampionshipObserverDisposer();
  }
}

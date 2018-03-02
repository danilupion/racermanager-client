import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChampionshipsService } from './championships.service';
import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface CircuitModelType extends BaseModelType {
  name: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

@Injectable()
export class CircuitsService extends AbstractRestCollectionService<CircuitModelType> {
  protected baseUrl = `/api/championships/${this.championshipsService.selected}/circuits`;
  protected name = 'Circuit';

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    super(http);
  }
}

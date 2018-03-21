import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChampionshipsService } from './championships.service';
import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface DriverModelType extends BaseModelType {
  driverId: string;
  name: string;
  code: string;
  countryCode: string;
}

@Injectable()
export class DriversService extends AbstractRestCollectionService<DriverModelType> {
  protected name = 'Driver';

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    super(http);
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/drivers`;
  }
}


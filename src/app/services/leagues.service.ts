import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChampionshipsService } from './championships.service';
import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface LeagueModelType extends BaseModelType {
  name: string;
  countryCode: string;
}

@Injectable()
export class LeaguesService extends AbstractRestCollectionService<LeagueModelType> {
  protected name = 'League';

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    super(http);
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/leagues`;
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChampionshipsService } from './championships.service';
import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface TeamModelType extends BaseModelType {
  name: string;
  countryCode: string;
}

@Injectable()
export class TeamsService extends AbstractRestCollectionService<TeamModelType> {
  protected name = 'Team';

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    super(http);
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/teams`;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface TeamModelType extends BaseModelType {
  name: string;
  countryCode: string;
}

@Injectable()
export class TeamsService extends AbstractRestCollectionService<TeamModelType> {
  protected baseUrl = '/api/teams';
  protected name = 'Team';

  constructor(protected http: HttpClient) {
    super(http);
  }
}

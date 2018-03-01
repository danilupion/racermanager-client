import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface TeamModelDriver extends BaseModelType {
  name: string;
  countryCode: string;
}

@Injectable()
export class TeamsService extends AbstractRestCollectionService<TeamModelDriver> {
  protected baseUrl = '/api/teams';
  protected name = 'TeamModelDriver';

  constructor(protected http: HttpClient) {
    super(http);
  }
}

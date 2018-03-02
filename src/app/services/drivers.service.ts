import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface DriverModelType extends BaseModelType {
  name: string;
  code: string;
  countryCode: string;
}

@Injectable()
export class DriversService extends AbstractRestCollectionService<DriverModelType> {
  protected baseUrl = '/api/drivers';
  protected name = 'Driver';

  constructor(protected http: HttpClient) {
    super(http);
  }
}


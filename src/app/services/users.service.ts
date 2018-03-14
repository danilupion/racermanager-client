import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractRestCollectionService, BaseModelType } from './abstractRestCollection.service';

export interface UserModelType extends BaseModelType {
  username: string;
  email: string;
}

@Injectable()
export class UsersService extends AbstractRestCollectionService<UserModelType> {
  protected name = 'User';

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  protected getBaseUrl() {
    return `/api/users`;
  }
}

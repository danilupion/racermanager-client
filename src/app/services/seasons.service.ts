import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';

import { ChampionshipsService } from './championships.service';
import { BaseModelType } from './abstractRestCollection.service';
import { DriverModelType } from './drivers.service';
import { TeamModelType } from './teams.service';
import { CircuitModelType } from './circuits.service';
import { GrandPrixModelType } from './grandsPrix.service';

interface TeamDriverType extends BaseModelType {
  driver: DriverModelType;
  initialValue: number;
}

interface SeasonTeamType extends BaseModelType {
  team: TeamModelType;
  drivers: TeamDriverType[];
}

interface ResultType extends BaseModelType {
  driver: DriverModelType;
  position: number;
  points: number;
  accumulatedPoints: number;
  accumulatedFitness: number;
}

interface SeasonGrandPrixType extends BaseModelType{
  circuit: CircuitModelType;
  grandPrix: GrandPrixModelType;
  firstPracticeUTC: Date;
  secondPracticeUTC: Date;
  thirdPracticeUTC: Date;
  qualifyingUTC: Date;
  raceUTC: Date;
  results: ResultType[];
}

export interface SeasonModelType extends BaseModelType {
  name: string;
  seasonGrandPrixes: SeasonGrandPrixType[];
  teams: SeasonTeamType[];
  grandsPrix: SeasonGrandPrixType[];
}

@Injectable()
export class SeasonsService {
  protected name = 'Season';

  @observable
  selected;

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    this.update();
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/seasons`;
  }

  public update() {
    this.getSeason((new Date()).getFullYear().toString());
  }

  @action
  protected async getSeason(name: string) {
    try {
      this.selected = await this.http.get<SeasonTeamType>(`${this.getBaseUrl()}/${name}`)
        .toPromise();
    } catch (err) {
      throw new Error(`${name} retrieval failed`);
    }
  }
}

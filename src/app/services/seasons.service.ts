import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';

import { ChampionshipsService } from './championships.service';
import { BaseModelType } from './abstractRestCollection.service';
import { DriverModelType } from './drivers.service';
import { TeamModelType } from './teams.service';
import { CircuitModelType } from './circuits.service';
import { GrandPrixModelType } from './grandsPrix.service';

export interface TeamDriverModelType extends BaseModelType {
  driver: DriverModelType;
  initialValue: number;
}

export interface SeasonTeamModelType extends BaseModelType {
  team: TeamModelType;
  drivers: TeamDriverModelType[];
}

export interface ResultModelType extends BaseModelType {
  driver: DriverModelType;
  position: number;
  points: number;
  accumulatedPoints: number;
  accumulatedFitness: number;
}

export interface SeasonGrandPrixModelType extends BaseModelType{
  circuit: CircuitModelType;
  grandPrix: GrandPrixModelType;
  firstPracticeUTC: Date;
  secondPracticeUTC: Date;
  thirdPracticeUTC: Date;
  qualifyingUTC: Date;
  raceUTC: Date;
  results: ResultModelType[];
}

export interface SeasonModelType extends BaseModelType {
  name: string;
  seasonGrandPrixes: SeasonGrandPrixModelType[];
  teams: SeasonTeamModelType[];
  grandsPrix: SeasonGrandPrixModelType[];
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

  protected getTeamsUrl() {
    return `${this.getBaseUrl()}/${this.selected.name}/teams`;
  }

  public async update() {
    await this.getSeason((new Date()).getFullYear().toString());
  }

  @action
  protected async getSeason(name: string) {
    try {
      this.selected = await this.http.get<SeasonModelType>(`${this.getBaseUrl()}/${name}`)
        .toPromise();
    } catch (err) {
      throw new Error(`${name} retrieval failed`);
    }
  }

  @action
  public async createTeam(team: SeasonTeamModelType) {
    try {
      const newTeam = await this.http.post<SeasonTeamModelType>(this.getTeamsUrl(), team)
        .toPromise();

      this.selected.teams.push(newTeam);
    } catch (err) {
      throw new Error(`${name} team creation failed`);
    }
  }

  @action
  public async removeTeam(team: SeasonTeamModelType) {
    try {
      await this.http.delete(`${this.getTeamsUrl()}/${team.id}`)
        .toPromise();

      this.selected.teams.remove(team);
    } catch (err) {
      throw new Error(`${name} team deletion failed`);
    }
  }

  @action
  public async updateTeam(team: SeasonTeamModelType) {
    try {
      const updatedTeam = await this.http.put<SeasonTeamModelType>(`${this.getTeamsUrl()}/${team.id}`, team)
        .toPromise();

      const modelIndex = this.selected.teams.findIndex((candidate) => candidate.id === team.id);

      if (modelIndex !== -1) {
        this.selected.teams.set(modelIndex, updatedTeam);
      }
    } catch (err) {
      throw new Error(`${this.name} team update failed`);
    }
  }
}

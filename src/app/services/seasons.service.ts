import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { action, observable, computed } from 'mobx-angular';
import { reaction } from 'mobx';

import { ChampionshipsService } from './championships.service';
import { BaseModelType } from './abstractRestCollection.service';
import { DriverModelType } from './drivers.service';
import { TeamModelType } from './teams.service';
import { CircuitModelType } from './circuits.service';

export interface SeasonDriverModelType extends BaseModelType {
  championship: string;
  code: string;
  driverId: string;
  fitness: string;
  name: string;
  points: string;
  initialPrice: number;
  value: string;
}

export interface SeasonTeamModelType extends BaseModelType {
  team: TeamModelType;
  drivers: SeasonDriverModelType[];
  bonus: number;
}

export interface ResultModelType extends BaseModelType {
  driver: DriverModelType;
  position: number;
  points: number;
  fitness: number;
  value: number;
}

export interface SeasonGrandPrixModelType extends BaseModelType {
  circuit: CircuitModelType;
  name: string;
  countryCode: string;
  practice1UTC: Date;
  practice2UTC: Date;
  practice3UTC: Date;
  qualifyingUTC: Date;
  raceUTC: Date;
  results: ResultModelType[];
}

export interface SeasonModelType extends BaseModelType {
  championship: string;
  name: string;
  seasonGrandPrixes: SeasonGrandPrixModelType[];
  teams: SeasonTeamModelType[];
  grandsPrix: SeasonGrandPrixModelType[];
  marketOpen: boolean;
  currentTransactionFeePercentage: number;
}

@Injectable()
export class SeasonsService {
  protected name = 'Season';

  @observable
  selected;

  @computed({ keepAlive: true })
  get drivers() {
    return this.selected && this.selected.drivers.toJS() || [];
  }

  @computed({ keepAlive: true })
  get teams() {
    if (!this.selected) {
      return [];
    }

    return this.selected.teams.map(
      (team) => {
        const { driverIds, ...rest} = team;

        const drivers = team.driverIds.map(
          driverId => this.selected.drivers.find(candidate => candidate.driverId === driverId),
        );

        return {
          ...rest,
          drivers,
          points: drivers.reduce((accumulated, current) => accumulated + (current && current.points || 0), 0),
        };
      },
    );
  }

  @computed({ keepAlive: true })
  get grandsPrix() {
    return this.selected && this.selected.grandsPrix.toJS() || [];
  }

  constructor(
    protected http: HttpClient,
    private championshipsService: ChampionshipsService,
  ) {
    this.update();
    reaction(
      () => this.championshipsService.selected,
      this.update.bind(this),
    );
  }

  protected getBaseUrl() {
    return `/api/championships/${this.championshipsService.selected}/seasons`;
  }

  protected getTeamsUrl() {
    return `${this.getBaseUrl()}/${this.selected.name}/teams`;
  }

  protected getDriversUrl() {
    return `${this.getBaseUrl()}/${this.selected.name}/drivers`;
  }

  protected getGrandsPrixUrl() {
    return `${this.getBaseUrl()}/${this.selected.name}/grandsPrix`;
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
      this.selected = null;
      throw new Error(`${name} retrieval failed`);
    }
  }

  @action
  public async createDriver(driver: SeasonDriverModelType) {
    try {
      const newDriver = await this.http.post<SeasonTeamModelType>(this.getDriversUrl(), driver)
        .toPromise();

      this.selected.drivers.push(newDriver);
    } catch (err) {
      throw new Error(`${name} driver creation failed`);
    }
  }

  @action
  public async updateDriver(driver: SeasonDriverModelType) {
    try {
      const updatedDriver = await this.http.put<SeasonTeamModelType>(`${this.getDriversUrl()}/${driver.id}`, driver)
        .toPromise();

      const modelIndex = this.selected.drivers.findIndex((candidate) => candidate.id === driver.id);

      if (modelIndex !== -1) {
        this.selected.drivers.set(modelIndex, updatedDriver);
      }
    } catch (err) {
      throw new Error(`${this.name} driver update failed`);
    }
  }

  @action
  public async removeDriver(driver: SeasonDriverModelType) {
    try {
      await this.http.delete(`${this.getDriversUrl()}/${driver.id}`)
        .toPromise();

      this.selected.drivers.remove(driver);
    } catch (err) {
      throw new Error(`${name} driver deletion failed`);
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
  public async createGrandPrix(grandPrix: SeasonGrandPrixModelType) {
    try {
      const newGrandPrix = await this.http.post<SeasonGrandPrixModelType>(this.getGrandsPrixUrl(), grandPrix)
        .toPromise();

      this.selected.grandsPrix.push(newGrandPrix);
    } catch (err) {
      throw new Error(`${name} grand prix creation failed`);
    }
  }

  @action
  public async updateGrandPrix(grandPrix: SeasonGrandPrixModelType) {
    try {
      const updatedGrandPrix = await this.http.put<SeasonGrandPrixModelType>(`${this.getGrandsPrixUrl()}/${grandPrix.id}`, grandPrix)
        .toPromise();

      const modelIndex = this.selected.grandsPrix.findIndex((candidate) => candidate.id === grandPrix.id);

      if (modelIndex !== -1) {
        this.selected.grandsPrix.set(modelIndex, updatedGrandPrix);
      }
    } catch (err) {
      throw new Error(`${this.name} grand prix update failed`);
    }
  }

  @action
  public async removeGrandPrix(grandPrix: SeasonGrandPrixModelType) {
    try {
      await this.http.delete(`${this.getGrandsPrixUrl()}/${grandPrix.id}`)
        .toPromise();

      this.selected.grandsPrix.remove(grandPrix);
    } catch (err) {
      throw new Error(`${name} grand prix deletion failed`);
    }
  }

  @action
  public async setGrandPrixResults(grandPrix: SeasonGrandPrixModelType, results) {
    try {
      const updatedGrandPrix = await this.http.put<SeasonGrandPrixModelType>(`${this.getGrandsPrixUrl()}/${grandPrix.id}/results`, results)
        .toPromise();

      const modelIndex = this.selected.grandsPrix.findIndex((candidate) => candidate.id === grandPrix.id);

      if (modelIndex !== -1) {
        this.selected.grandsPrix.set(modelIndex, updatedGrandPrix);
      }
    } catch (err) {
      throw new Error(`${name} grand prix results  failed`);
    }
  }
}

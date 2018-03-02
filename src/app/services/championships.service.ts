import { Injectable } from '@angular/core';
import { action, observable } from 'mobx-angular';

import { Championship } from '../constants/championships';

const LOCAL_STORAGE_KEY = 'championship';

@Injectable()
export class ChampionshipsService {
  @observable
  public items = Object.keys(Championship).map(key => Championship[key]);

  @observable
  public selected;

  constructor() {
    let championship;
    try {
      championship = localStorage.getItem(LOCAL_STORAGE_KEY);
    } catch (err) { }

    this.setSelected(championship || Object.keys(Championship)[0]);
  }

  @action setSelected(championship: Championship) {
    this.selected = championship;
    localStorage.setItem(LOCAL_STORAGE_KEY, Championship[championship]);
  }
}

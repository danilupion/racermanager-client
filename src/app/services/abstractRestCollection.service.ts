import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';

export interface BaseModelType {
  id: string;
}

export abstract class AbstractRestCollectionService<T extends BaseModelType> {
  protected name;

  @observable
  public items;

  constructor(protected http: HttpClient) {
    this.items = [];
  }

  protected abstract getBaseUrl(): string;

  @action
  public async get() {
    try {
      const items = await this.http.get<T[]>(this.getBaseUrl())
        .toPromise();

      this.items.clear();
      this.items.push(...items);
    } catch (err) {
      throw new Error(`${name} list retrieval failed`);
    }
  }

  @action
  public async create(item: T) {
    try {
      const newItem = await this.http.post<T>(this.getBaseUrl(), item)
        .toPromise();

      this.items.push(newItem);
    } catch (err) {
      throw new Error(`${name} creation failed`);
    }
  }

  @action
  public async remove(item: T) {
    try {
      await this.http.delete(`${this.getBaseUrl()}/${item.id}`)
        .toPromise();

      this.items.remove(item);
    } catch (err) {
      throw new Error(`${name} deletion failed`);
    }
  }

  @action
  public async update(item: T) {
    try {
      const updatedItem = await this.http.put<T>(`${this.getBaseUrl()}/${item.id}`, item)
        .toPromise();

      const modelIndex = this.items.findIndex((candidate) => candidate.id === item.id);

      if (modelIndex !== -1) {
        this.items.set(modelIndex, updatedItem);
      }
    } catch (err) {
      throw new Error(`${this.name} update failed`);
    }
  }
}

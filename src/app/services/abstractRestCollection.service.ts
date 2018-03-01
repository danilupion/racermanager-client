import { HttpClient } from '@angular/common/http';
import { action, observable } from 'mobx-angular';

export interface BaseModelType {
  _id: string;
}

export abstract class AbstractRestCollectionService<T extends BaseModelType> {
  protected baseUrl;
  protected name;

  @observable
  public items;

  constructor(protected http: HttpClient) {
    this.items = [];
  }

  @action
  public async get() {
    const items = await this.http.get<T[]>(this.baseUrl)
      .toPromise();

    this.items.clear();
    this.items.push(...items);
  }

  @action
  public async create(item: T) {
    try {
      const newItem = await this.http.post<T>(this.baseUrl, item)
        .toPromise();

      this.items.push(newItem);
    } catch (err) {
      throw new Error(`${name} creation failed`);
    }
  }

  @action
  public async remove(item: T) {
    try {
      await this.http.delete(`${this.baseUrl}/${item._id}`)
        .toPromise();

      this.items.remove(item);
    } catch (err) {
      throw new Error(`${name} deletion failed`);
    }
  }

  @action
  public async update(item: T) {
    try {
      const updatedItem = await this.http.put<T>(`${this.baseUrl}/${item._id}`, item)
        .toPromise();

      const modelIndex = this.items.findIndex((candidate) => candidate._id === item._id);

      if (modelIndex !== -1) {
        this.items.set(modelIndex, updatedItem);
      }
    } catch (err) {
      throw new Error(`${this.name} update failed`);
    }
  }
}

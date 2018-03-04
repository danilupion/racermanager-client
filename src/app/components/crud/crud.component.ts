import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatSnackBar } from '@angular/material';

import { EditorDialogComponent } from './editorDialog/editorDialog.component';
import { BaseModelType } from '../../services/abstractRestCollection.service';

export interface CrudType<T extends BaseModelType> {
  getAll: () => Promise<void>;
  create: (T) => Promise<void>;
  update: (T) => Promise<void>;
  remove: (T) => Promise<void>;
}

export interface FieldDefinitionType {
  property: string;
  name?: string;
}

@Component({
  selector: 'rm-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public sectionTitle;

  @Input()
  public dataSource;

  @Input()
  public fields: [string|FieldDefinitionType];

  @Input()
  public crud: CrudType<BaseModelType>;

  public models = [];

  public selection = new SelectionModel(true, []);

  private dataSourceObserverDisposer;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  public getFieldName = (field) => {
    if (typeof field === 'object') {
      return field.name
        ? field.name
        : field.property;
    }

    return field;
  }

  public getFieldProperty = (field) => typeof field === 'object'
    ? field.property
    : field

  public getValue = (model, field) => model[this.getFieldProperty(field)];

  public getFieldNames() {
    return this.fields.map(this.getFieldName);
  }

  public getListHeaderColumns() {
    return [
      'select',
      ...this.getFieldNames(),
      'edit',
    ];
  }

  public isAllSelected() {
    return this.selection.selected.length === this.models.length;
  }

  private toggleAll() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.models.forEach(row => { this.selection.select(row); });
  }

  private showNewDialog() {
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      width: '368px',
      data: {
        fields: this.getFieldNames(),
        model: {},
      },
    });

    dialogRef.componentInstance.result.subscribe(
      async (model) => {
        dialogRef.componentInstance.setLoading(true);
        const result = await this.doCreate(model);
        dialogRef.componentInstance.setLoading(false);
        if (result) {
          dialogRef.close();
        }
      },
    );
  }

  private showEditDialog(model) {
    console.log(model);
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      width: '368px',
      data: {
        fields: this.getFieldNames(),
        model: {
          ...model,
        },
      },
    });

    dialogRef.componentInstance.result.subscribe(
      async (updatedModel) => {
        dialogRef.componentInstance.setLoading(true);
        const result = await this.doUpdate(updatedModel);
        dialogRef.componentInstance.setLoading(false);
        if (result) {
          dialogRef.close();
        }
      },
    );
  }

  private async doCreate(model) {
    try {
      await this.crud.create(model);
      return true;
    } catch (err) {
      this.snackBar.open(err.message, null, { duration: 3000 });
      return false;
    }
  }

  private async doUpdate(model) {
    try {
      await this.crud.update(model);
      return true;
    } catch (err) {
      this.snackBar.open(err.message, null, { duration: 3000 });
      return false;
    }
  }

  private removeSelected() {
    if (confirm(`Please confirm you want to delete ${this.selection.selected.length} elements`)) {
      this.selection.selected.forEach(item => this.crud.remove(item));
      this.selection.clear();
    }
  }

  private initializeModelsFromDataSource() {
    if (Array.isArray(this.dataSource)) {
      this.models = [...this.dataSource];
    } else if (this.dataSource && this.dataSource.toJS) {
      this.models = this.dataSource.toJS();
    } else {
      this.models = [];
    }
  }

  private disposeDataSourceObserver() {
    if (this.dataSourceObserverDisposer) {
      this.dataSourceObserverDisposer();
      this.dataSourceObserverDisposer = null;
    }
  }

  private refreshDataSourceObserver() {
    this.disposeDataSourceObserver();

    if (this.dataSource && this.dataSource.observe) {
      this.dataSourceObserverDisposer = this.dataSource.observe(() => this.initializeModelsFromDataSource());
    }
  }

  ngOnInit(): void {
    this.initializeModelsFromDataSource();
    this.refreshDataSourceObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.initializeModelsFromDataSource();
      this.refreshDataSourceObserver();
    }
  }

  ngOnDestroy(): void {
    this.disposeDataSourceObserver();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatSnackBar } from '@angular/material';

import { EditorDialogComponent } from './editorDialog/editorDialog.component';

export interface Crud {
  create: (any) => Promise<any>;
  update: (any) => Promise<any>;
  remove: (any) => Promise<any>;
}

@Component({
  selector: 'rm-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  @Input()
  sectionTitle;

  @Input()
  dataSource;

  @Input()
  columns;

  @Input()
  crud: Crud;

  models = [];

  selection = new SelectionModel(true, []);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  public getHeaderColumns() {
    return ['select', ...this.columns, 'edit'];
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
        fields: [...this.columns],
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
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      width: '368px',
      data: {
        fields: [...this.columns],
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

  ngOnInit(): void {
    this.models = this.dataSource.toJS();

    this.dataSource.observe(() => {
      this.models = this.dataSource.toJS();
    });
  }
}

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AbstractFieldManagerComponent } from '../abstractFieldManager.component';

@Component({
  templateUrl: './editorDialog.component.html',
})
export class EditorDialogComponent extends AbstractFieldManagerComponent {
  @Output()
  public result = new EventEmitter();

  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  public setLoading(loading) {
    this.loading = loading;
  }

  public save() {
    this.result.emit({ ...this.data.model });
  }

  private close(): void {
    this.dialogRef.close();
  }
}

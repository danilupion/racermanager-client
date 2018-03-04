import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rm-crud-editor-dialog',
  templateUrl: './editorDialog.component.html',
})
export class EditorDialogComponent {
  @Output()
  public result = new EventEmitter();

  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public setLoading(loading) {
    this.loading = loading;
  }

  private fieldIsInput(field) {
    return typeof field === 'string';
  }

  private fieldIsSelect(field) {
    return field && field.options;
  }

  public save() {
    this.result.emit({ ...this.data.model });
  }

  private close(): void {
    this.dialogRef.close();
  }
}

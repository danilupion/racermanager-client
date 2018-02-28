import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rm-crud-editor-dialog',
  templateUrl: './editorDialog.component.html',
})
export class EditorDialogComponent {
  @Output()
  result = new EventEmitter();

  loading = false;

  constructor(
    private dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  setLoading(loading) {
    this.loading = loading;
  }

  save() {
    this.result.emit({ ...this.data.model });
  }

  close(): void {
    this.dialogRef.close();
  }
}

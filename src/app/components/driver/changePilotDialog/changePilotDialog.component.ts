import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rm-driver-change-dialog',
  templateUrl: './changePilotDialog.component.html',
})
export class ChangePilotDialogComponent {
  @Output()
  private result = new EventEmitter();

  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<ChangePilotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

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

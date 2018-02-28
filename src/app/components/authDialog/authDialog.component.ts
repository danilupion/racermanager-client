import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rm-auth-dialog',
  templateUrl: './authDialog.component.html',
  styleUrls: ['./authDialog.component.scss'],
})
export class AuthDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}

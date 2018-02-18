import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'rm-auth-dialog',
  templateUrl: './authDialog.component.html',
  styleUrls: ['./authDialog.component.scss'],
})
export class AuthDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private apiService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private close(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'rm-auth-dialog',
  templateUrl: './authDialog.component.html',
  styleUrls: ['./authDialog.component.css'],
})
export class AuthDialogComponent {
  username = '';
  password = '';

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private apiService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    console.log('asdf');
    const a = this.apiService.token(this.username, this.password);
    console.log(a);
    a.subscribe(data => console.log(data));
  }
}

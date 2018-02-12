import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'rm-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() success = new EventEmitter();
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  login(): void {
    this.loading = true;
    this.authService.token(this.username, this.password)
      .then(() => {
        this.success.emit();
      })
      .catch((err) => {
        this.snackBar.open('Please check your credentials', null, { duration: 3000 });
      })
      .then(() => {
        this.loading = false;
      });
  }

  validate(): boolean {
    return !!this.username && !!this.password;
  }
}

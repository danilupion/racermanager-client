import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'rm-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output()
  success = new EventEmitter();

  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  async login() {
    try {
      this.loading = true;
      await this.authService.authenticate(this.username, this.password);
      this.success.emit();
    } catch (err) {
      this.snackBar.open(err.message, null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  validate(): boolean {
    return !!this.username && !!this.password;
  }
}

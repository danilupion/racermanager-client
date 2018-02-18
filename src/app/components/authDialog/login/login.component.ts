import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'rm-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output()
  private success = new EventEmitter();

  private username = '';
  private password = '';
  private loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  private async login() {
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

  private validate(): boolean {
    return !!this.username && !!this.password;
  }
}

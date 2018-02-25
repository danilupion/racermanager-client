import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'rm-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output()
  success = new EventEmitter();

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  async login() {
    try {
      this.loading = true;
      await this.authService.authenticate(this.username.value, this.password.value);
      this.success.emit();
    } catch (err) {
      this.snackBar.open(err.message, null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  isValid(): boolean {
    return this.username.valid && this.password.valid;
  }
}

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
  private success = new EventEmitter();

  public username = new FormControl('', Validators.required);

  public password = new FormControl('', Validators.required);

  public loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  public async login() {
    try {
      this.loading = true;
      await this.authService.authenticate(this.username.value, this.password.value);
      this.success.emit();
    } catch (err) {
      this.snackBar.open('Ocurrió un error al hacer login, vuelve a intentarlo revisando tus credenciales', null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  public submitOnEnter(event) {
    if (this.isValid() && event.keyCode === 13) {
      this.login();
    }
  }

  public isValid(): boolean {
    return this.username.valid && this.password.valid;
  }
}

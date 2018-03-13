import {Component, EventEmitter, Output} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { sameAsValidator } from '../../../validators/samesAsValidator';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'rm-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output()
  private success = new EventEmitter();

  public username = new FormControl('', [Validators.required]);

  public email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i),
  ]);

  public password = new FormControl('', [
    Validators.required,
    Validators.pattern( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%\^\&*\)\(\]\[\+=\.,_-]).{8,}$/),
  ]);

  public repeatedPassword = new FormControl('', [sameAsValidator(this.password)]);

  public loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  public async register() {
    try {
      this.loading = true;
      await this.authService.register(this.username.value, this.email.value, this.password.value);
      this.snackBar.open('Usuario creado correctamente, ya puedes hacer login', null, { duration: 3000 });
      this.success.emit();
    } catch (err) {
      this.snackBar.open('Ocurrió un error al crear el usuario', null, { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  public submitOnEnter(event) {
    if (this.isValid() && event.keyCode === 13) {
      this.register();
    }
  }

  public isValid(): boolean {
    return this.username.valid
    && this.email.valid
    && this.password.valid
    && this.password.value === this.repeatedPassword.value;
  }
}

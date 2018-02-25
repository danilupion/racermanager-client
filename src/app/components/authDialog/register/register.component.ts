import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { sameAsValidator } from '../../../validators/samesAsValidator';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'rm-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%\^\&*\)\(\]\[\+=\.,_-]).{8,}$/),
  ]);
  repeatedPassword = new FormControl('', [sameAsValidator(this.password)]);
  loading = false;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  async register() {
    try {
      this.loading = true;
      await this.usersService.create(this.username.value, this.email.value, this.password.value);
    } catch (err) {
      this.snackBar.open('There was an error creating the user', null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  isValid(): boolean {
    return this.username.valid
    && this.email.valid
    && this.password.valid
    && this.password.value === this.repeatedPassword.value;
  }
}

import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../utils/myErrorStateMatcher';

@Component({
  selector: 'rm-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  repeatedPassword = '';
  loading = false;

  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  async register() {
    try {
      this.loading = true;
      await this.usersService.create(this.username, this.email, this.password);
    } catch (err) {
      this.snackBar.open('There was an error creating the user', null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  validate(): boolean {
    return !!this.username
    && !!this.password
    && !this.emailFormControl.hasError('email')
    && !!this.password
    && this.password === this.repeatedPassword;
  }
}

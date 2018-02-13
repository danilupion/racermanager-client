import { Component } from '@angular/core';
import { UsersService } from '../../../services/api/users.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'rm-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private username = '';
  private email = '';
  private password = '';
  private repeatedPassword = '';
  private loading = false;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  private async register() {
    try {
      this.loading = true;
      await this.usersService.create(this.username, this.email, this.password);
    } catch (err) {
      this.snackBar.open('There was an error creating the user', null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  private validate(): boolean {
    return !!this.username && !!this.password && !!this.password && this.password === this.repeatedPassword;
  }
}

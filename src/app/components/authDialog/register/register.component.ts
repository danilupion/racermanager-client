import { Component } from '@angular/core';
import { UsersService } from '../../../services/api/users.service';

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

  constructor(
    private usersService: UsersService,
  ) { }

  register(): void {
    this.usersService.create(this.username, this.email, this.password)
      .subscribe(data => console.log(data));
  }
}

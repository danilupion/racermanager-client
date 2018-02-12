import { Component } from '@angular/core';
import { AuthService } from '../../../services/api/auth.service';
import {unescapeHtml} from '@angular/platform-browser/src/browser/transfer_state';

@Component({
  selector: 'rm-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
  ) { }

  login(): void {
    this.loading = true;
    this.authService.token(this.username, this.password)
      .subscribe(data => console.log(data));
  }

  validate(): boolean {
    return !!this.username && !!this.password;
  }
}

import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../constants/roles';

@Component({
  selector: 'rm-header-user-menu',
  templateUrl: './userMenu.component.html',
})
export class UserMenuComponent {
  @Input()
  links = [];

  Role = Role;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}

import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/api/auth.service';
import { Role } from '../../../constants/roles';

@Component({
  selector: 'rm-header-user-menu',
  templateUrl: './userMenu.component.html',
})
export class UserMenuComponent {
  @Input()
  private links = [];

  private Role = Role;

  constructor(private authService: AuthService) {}

  private logout() {
    this.authService.logout();
  }
}

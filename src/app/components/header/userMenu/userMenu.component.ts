import { Component } from '@angular/core';
import { AuthStore } from '../../../stores/auth.store';
import { AuthService } from '../../../services/api/auth.service';
import { Role } from '../../../constants/roles';

@Component({
  selector: 'rm-header-user-menu',
  templateUrl: './userMenu.component.html',
})
export class UserMenuComponent {
  private Role = Role;

  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
  }
}

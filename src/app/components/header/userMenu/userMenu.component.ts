import { Component } from '@angular/core';
import { AuthStore } from '../../../stores/auth.store';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'rm-header-user-menu',
  templateUrl: './userMenu.component.html',
})
export class UserMenuComponent {
  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
  }
}

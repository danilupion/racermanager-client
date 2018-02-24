import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import construct = Reflect.construct;

@Component({
  selector: 'rm-admin',
  templateUrl: './main.page.html',
})
export class MainPageComponent {
  title = 'Racer Manager';
  titleUrl = '/';
  menuLinks = [
    {
      guard: () => this.authService.isAdmin,
      icon: 'settings',
      text: 'Admin',
      url: '/admin',
    },
  ];

  constructor(private authService: AuthService) {}
}

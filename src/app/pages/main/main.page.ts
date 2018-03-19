import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPageComponent {
  public title = 'Racer Manager';

  public titleUrl = '/';

  public links = [
    {
      icon: 'people',
      text: 'Escuderías',
      url: '/teams',
    },
    {
      icon: 'face',
      text: 'Pilotos',
      url: '/drivers',
    },
    {
      icon: 'fa-flag-checkered',
      text: 'Grandes premios',
      url: '/grandsPrix',
    },
  ];

  public menuLinks = [
    {
      guard: () => this.authService.isAdmin,
      icon: 'settings',
      text: 'Admin',
      url: '/admin',
    },
  ];

  constructor(private authService: AuthService) {}
}

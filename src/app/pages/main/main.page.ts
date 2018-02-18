import { Component } from '@angular/core';

@Component({
  selector: 'rm-admin',
  templateUrl: './main.page.html',
})
export class MainPageComponent {
  private title = 'Racer Manager';
  private titleUrl = '/';
  private menuLinks = [
    {
      icon: 'settings',
      text: 'Admin',
      url: '/admin',
    },
  ];
}

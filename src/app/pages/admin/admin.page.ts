import { Component } from '@angular/core';

@Component({
  selector: 'rm-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent {
  private title = 'Racer Manager Admin';
  private titleUrl = '/admin';
  private links = [
    {
      icon: 'people',
      text: 'Teams',
      url: '/admin/teams',
    },
  ];
  private menuLinks = [
    {
      icon: 'home',
      text: 'Back',
      url: '/',
    },
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'rm-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent {
  title = 'Racer Manager Admin';
  titleUrl = '/admin';
  links = [
    {
      icon: 'people',
      text: 'Teams',
      url: '/admin/teams',
    },
  ];
  menuLinks = [
    {
      icon: 'home',
      text: 'Back',
      url: '/',
    },
  ];
}

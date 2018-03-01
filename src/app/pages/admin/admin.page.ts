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
    {
      icon: 'face',
      text: 'Drivers',
      url: '/admin/drivers',
    },
    {
      icon: 'all_inclusive',
      text: 'Circuits',
      url: '/admin/circuits',
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

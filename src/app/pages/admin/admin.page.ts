import { Component } from '@angular/core';

@Component({
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent {
  public title = 'Racer Manager Admin';

  public titleUrl = '/admin';

  public links = [
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
    {
      icon: 'fa-flag-checkered',
      text: 'Grands Prix',
      url: '/admin/grandsPrix',
    },
    {
      icon: 'people',
      text: 'Season Teams',
      url: '/admin/seasonTeams',
    },
  ];

  public menuLinks = [
    {
      icon: 'home',
      text: 'Back',
      url: '/',
    },
  ];
}

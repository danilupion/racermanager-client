import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { MainPageComponent } from './pages/main/main.page';
import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'admin', component: AdminPageComponent,
    children: [
      { path: 'teams', component: TeamsAdminPageComponent },
    ],
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: !environment.production,
      },
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }

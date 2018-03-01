import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { AdminGuard } from './guards/admin.guard';
import { MainPageComponent } from './pages/main/main.page';
import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';
import { DriversAdminPageComponent } from './pages/admin/drivers/driversAdmin.page';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'admin', canActivate: [AdminGuard], component: AdminPageComponent,
    children: [
      { path: 'teams', component: TeamsAdminPageComponent },
      { path: 'drivers', component: DriversAdminPageComponent },
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

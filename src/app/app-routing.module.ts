import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { AdminGuard } from './guards/admin.guard';
import { MainPageComponent } from './pages/main/main.page';
import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';
import { DriversAdminPageComponent } from './pages/admin/drivers/driversAdmin.page';
import { CircuitsAdminPageComponent } from './pages/admin/circuits/circuitsAdmin.page';
import { GrandsPrixAdminPageComponent } from './pages/admin/grandsPrix/grandsPrixAdmin.page';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'admin', canActivate: [AdminGuard], component: AdminPageComponent,
    children: [
      { path: 'teams', component: TeamsAdminPageComponent },
      { path: 'drivers', component: DriversAdminPageComponent },
      { path: 'circuits', component: CircuitsAdminPageComponent },
      { path: 'grandsPrix', component: GrandsPrixAdminPageComponent },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AdminPageComponent } from './pages/admin/admin.page';
import { MainPageComponent } from './pages/main/main.page';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'admin', component: AdminPageComponent },
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

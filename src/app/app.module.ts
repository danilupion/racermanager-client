import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatSnackBarModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatOptionModule,
} from '@angular/material';

import { MobxAngularModule } from 'mobx-angular';

import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthDialogComponent } from './components/authDialog/authDialog.component';
import { RegisterComponent } from './components/authDialog/register/register.component';
import { LoginComponent } from './components/authDialog/login/login.component';
import { UserMenuComponent } from './components/header/userMenu/userMenu.component';
import { LoadingButtonComponent } from './components/loadingButton/loadingButton.component';
import { CrudComponent } from './components/crud/crud.component';
import { EditorDialogComponent } from './components/crud/editorDialog/editorDialog.component';
import { ChangePilotDialogComponent } from './components/driver/changePilotDialog/changePilotDialog.component';

import { MainPageComponent } from './pages/main/main.page';
import { TeamsPageComponent } from './pages/main/teams/teams.page';
import { DriversPageComponent } from './pages/main/drivers/drivers.page';

import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';
import { DriversAdminPageComponent } from './pages/admin/drivers/driversAdmin.page';
import { CircuitsAdminPageComponent } from './pages/admin/circuits/circuitsAdmin.page';
import { GrandsPrixAdminPageComponent } from './pages/admin/grandsPrix/grandsPrixAdmin.page';
import { SeasonTeamsAdminPageComponent } from './pages/admin/seasonTeams/seasonTeamsAdmin.page';
import { SeasonDriversAdminPageComponent } from './pages/admin/seasonDrivers/seasonDriversAdmin.page';
import { SeasonGrandsPrixAdminPageComponent } from './pages/admin/seasonGrandsPrix/seasonGrandsPrixAdmin.page';
import { LeaguesAdminPageComponent } from './pages/admin/leagues/leaguesAdmin.page';
import { LeagueUsersAdminDialogComponent } from './pages/admin/leagues/leagueUsersAdminDialog/leagueUsersAdminDialog.component';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ChampionshipsService } from './services/championships.service';
import { SeasonsService } from './services/seasons.service';
import { TeamsService } from './services/teams.service';
import { DriversService } from './services/drivers.service';
import { CircuitsService } from './services/circuits.service';
import { GrandsPrixService } from './services/grandsPrix.service';
import { LeaguesService } from './services/leagues.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DriverComponent } from './components/driver/driver.component';

import { CapitalizePipe } from './pipes/capitalize.pipe';

registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AuthDialogComponent,
    UserMenuComponent,
    LoadingButtonComponent,
    CrudComponent,
    EditorDialogComponent,
    MainPageComponent,
    TeamsPageComponent,
    DriversPageComponent,
    AdminPageComponent,
    TeamsAdminPageComponent,
    DriversAdminPageComponent,
    CircuitsAdminPageComponent,
    GrandsPrixAdminPageComponent,
    SeasonTeamsAdminPageComponent,
    SeasonDriversAdminPageComponent,
    SeasonGrandsPrixAdminPageComponent,
    LeaguesAdminPageComponent,
    LeagueUsersAdminDialogComponent,
    CapitalizePipe,
    DriverComponent,
    ChangePilotDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MobxAngularModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    AuthService,
    UsersService,
    ChampionshipsService,
    SeasonsService,
    TeamsService,
    DriversService,
    CircuitsService,
    GrandsPrixService,
    LeaguesService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    AuthDialogComponent,
    EditorDialogComponent,
    LeagueUsersAdminDialogComponent,
    ChangePilotDialogComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

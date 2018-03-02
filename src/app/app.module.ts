import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
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

import { MainPageComponent } from './pages/main/main.page';
import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';
import { DriversAdminPageComponent } from './pages/admin/drivers/driversAdmin.page';
import { CircuitsAdminPageComponent } from './pages/admin/circuits/circuitsAdmin.page';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ChampionshipsService } from './services/championships.service';
import { TeamsService } from './services/teams.service';
import { DriversService } from './services/drivers.service';
import { CircuitsService } from './services/circuits.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

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
    AdminPageComponent,
    TeamsAdminPageComponent,
    DriversAdminPageComponent,
    CircuitsAdminPageComponent,
    CapitalizePipe,
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
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    UsersService,
    ChampionshipsService,
    TeamsService,
    DriversService,
    CircuitsService,
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
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

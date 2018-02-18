import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
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

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthDialogComponent } from './components/authDialog/authDialog.component';
import { RegisterComponent } from './components/authDialog/register/register.component';
import { LoginComponent } from './components/authDialog/login/login.component';
import { UserMenuComponent } from './components/header/userMenu/userMenu.component';
import { LoadingButtonComponent } from './components/loadingButton/loadingButton.component';

import { MainPageComponent } from './pages/main/main.page';
import { AdminPageComponent } from './pages/admin/admin.page';
import { TeamsAdminPageComponent } from './pages/admin/teams/teamsAdmin.page';

import { AuthService } from './services/api/auth.service';
import { UsersService } from './services/api/users.service';
import { TeamsService } from './services/api/teams.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AuthDialogComponent,
    UserMenuComponent,
    LoadingButtonComponent,
    MainPageComponent,
    AdminPageComponent,
    TeamsAdminPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
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
    TeamsService,
  ],
  entryComponents: [
    AuthDialogComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

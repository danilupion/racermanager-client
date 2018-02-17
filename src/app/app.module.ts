import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
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

import { AuthStore } from './stores/auth.store';
import { UsersService } from './services/api/users.service';
import { AuthService } from './services/api/auth.service';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
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
    AuthStore,
    AuthService,
    UsersService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

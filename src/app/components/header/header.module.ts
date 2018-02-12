import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatMenuModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AuthDialogModule } from '../authDialog/authDialog.module';
import { AuthStore } from '../../stores/auth.store';
import { UserMenuComponent } from './userMenu/userMenu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserMenuComponent,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    AuthDialogModule,
    CommonModule,
  ],
  providers: [
    AuthStore,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }

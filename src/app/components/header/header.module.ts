import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AuthDialogModule } from '../authDialog/authDialog.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    AuthDialogModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }

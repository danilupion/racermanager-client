import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AuthDialogComponent } from './authDialog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoadingButtonModule } from '../loadingButton/loadingButton.module';
import { AuthService } from '../../services/api/auth.service';
import { UsersService } from '../../services/api/users.service';
import { AuthStore } from '../../stores/auth.store';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthDialogComponent,
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    LoadingButtonModule,
  ],
  providers: [
    AuthStore,
    AuthService,
    UsersService,
  ],
  exports: [
    AuthDialogComponent,
  ],
  entryComponents: [
    AuthDialogComponent,
  ],
})
export class AuthDialogModule { }

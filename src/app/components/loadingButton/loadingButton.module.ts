import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loadingButton.component';

@NgModule({
  declarations: [
    LoadingButtonComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
    LoadingButtonComponent,
  ],
})
export class LoadingButtonModule { }

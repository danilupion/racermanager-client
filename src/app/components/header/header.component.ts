import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../authDialog/authDialog.component';
import { AuthStore } from '../../stores/auth.store';

@Component({
  selector: 'rm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title;

  constructor(
    private dialog: MatDialog,
    private authStore: AuthStore,
  ) {}

  showLoginDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '368px',
    });
  }
}

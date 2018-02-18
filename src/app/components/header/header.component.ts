import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../authDialog/authDialog.component';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'rm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  private title = '';

  @Input()
  private titleUrl = '/';

  @Input()
  private color = 'primary';

  @Input()
  private links = [];

  @Input()
  private menuLinks = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  private showLoginDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '368px',
    });
  }
}

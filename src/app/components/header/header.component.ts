import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../authDialog/authDialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'rm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  title = '';

  @Input()
  titleUrl = '/';

  @Input()
  color = 'primary';

  @Input()
  links = [];

  @Input()
  menuLinks = [];

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
  ) {}

  private showLoginDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '368px',
    });
  }
}

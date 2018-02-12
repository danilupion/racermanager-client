import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../authDialog/authDialog.component';

@Component({
  selector: 'rm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() title;

  constructor(public dialog: MatDialog) {}

  showLoginDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '368px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

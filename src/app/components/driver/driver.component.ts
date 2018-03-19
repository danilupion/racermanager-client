import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthService } from '../../services/auth.service';
import { DriverModelType } from '../../services/drivers.service';
import { ChangePilotDialogComponent } from './changePilotDialog/changePilotDialog.component';
import { MyLeaguesService } from '../../services/myLeagues.service';

@Component({
  selector: 'rm-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent {
  @Input()
  public driver: DriverModelType;

  constructor(
    public authService: AuthService,
    public myLeaguesService: MyLeaguesService,
    private dialog: MatDialog,
  ) { }

  public getDriverImageUrl() {
    if (this.driver) {
      return `/assets/pilots/${this.driver.code}.jpg`;
    }

    return `/assets/pilot.jpg`;
  }
}

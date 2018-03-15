import { DriverModelType } from './../../services/drivers.service';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ChangePilotDialogComponent } from './changePilotDialog/changePilotDialog.component';

@Component({
  selector: 'rm-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {

  @Input()
  public driverCode: string;

  public urlDriver: string;

  // My Drivers
  // TODO: Remove this mock
  public pilots = [
    {
      name: 'Hamilton',
      code: 'HAM',
      countryCode: 'GBR',
    },
    {
      name: 'ESTEBAN',
      code: 'OCO',
      countryCode: 'FRA',
    },
  ];
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.changeUrlDriver(this.driverCode);
  }

  // TODO: Implement change driver
  public changePilot(driverFrom, driverTo) {
    this.changeUrlDriver(driverTo);
    console.log('Change from', driverFrom, ' To ', driverTo);
  }

  private changeUrlDriver(driverCode) {
    this.urlDriver = `../../../assets/pilots/${driverCode}.jpg`;
  }
}

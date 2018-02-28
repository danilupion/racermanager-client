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
  driverCode: string;

  urlDriver: string;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.urlDriver = `../../../assets/pilots/${this.driverCode}.jpg`;
  }

  private showChangePilotDialog() {
    const dialogRef = this.dialog.open(ChangePilotDialogComponent, {
      width: '368px',
      data: {
        fields: [...['Pilots']],
        model: {},
      },
    });

    // dialogRef.componentInstance.result.subscribe(
    //   async (model) => {
    //     dialogRef.componentInstance.setLoading(true);
    //     const result = await this.doCreate(model);
    //     dialogRef.componentInstance.setLoading(false);
    //     if (result) {
    //       dialogRef.close();
    //     }
    //   },
    // );
  }
}

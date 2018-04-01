import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { SeasonsService } from '../../../../services/seasons.service';
import { alphabeticalOrder } from '../../../../utils/sorting';

@Component({
  templateUrl: './resultsAdminDialog.component.html',
})
export class ResultsAdminDialogComponent implements OnInit {
  public loading = false;

  public results;

  public positions = [];

  public drivers = [];

  public points = [];

  public availableDrivers = [];

  public defaultPoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  constructor(
    private dialogRef: MatDialogRef<ResultsAdminDialogComponent>,
    private snackBar: MatSnackBar,
    private seasonService: SeasonsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.results = data.results;
  }

  public setLoading(loading): void {
    this.loading = loading;
  }

  public close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.positions = Array(this.seasonService.selected.teams.length * 2)
      .fill(null)
      .map((item, index) => index + 1);

    this.drivers = this.positions.map(
      () => new FormControl(
        '',
        [ Validators.required ],
      ),
    );

    this.points = this.positions.map(
      (position, index) => new FormControl(
        this.defaultPoints[index]
          ? this.defaultPoints[index]
          : 0,
        [ Validators.required ],
      ),
    );

    this.availableDrivers = this.seasonService.drivers.sort((d1, d2) => alphabeticalOrder(d1.name, d2.name));
  }

  public getAvailabledDrivers(position) {
    const selectedIds = this.drivers
      .map(control => control.value)
      .filter( value => value !== '');

    const availableDrivers = this.availableDrivers.filter(driver => !selectedIds.includes(driver.driverId));

    return this.drivers[position].value
      ? [...availableDrivers, this.availableDrivers.find(driver => driver.driverId === this.drivers[position].value)]
      : availableDrivers;
  }

  public isValid(): boolean {
    return this.drivers.every(control => control.valid) && this.points.every(control => control.valid);
  }

  public setResults() {

  }
}

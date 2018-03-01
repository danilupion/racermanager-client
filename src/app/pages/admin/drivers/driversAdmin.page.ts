import { Component, OnInit } from '@angular/core';

import { CrudType } from '../../../components/crud/crud.component';
import { DriverModelType, DriversService } from '../../../services/drivers.service';

@Component({
  selector: 'rm-admin-drivers',
  templateUrl: './driversAdmin.page.html',
})
export class DriversAdminPageComponent implements OnInit {
  columns = ['name', 'code', 'countryCode'];

  crud: CrudType<DriverModelType> = {
    getAll: () => this.driversService.get(),
    create: (driver) => this.driversService.create(driver),
    update: (driver) => this.driversService.update(driver),
    remove: (driver) => this.driversService.remove(driver),
  };

  constructor(public driversService: DriversService) { }

  ngOnInit(): void {
    this.driversService.get();
  }
}

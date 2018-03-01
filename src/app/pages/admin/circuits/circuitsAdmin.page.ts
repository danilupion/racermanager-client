import { Component, OnInit } from '@angular/core';

import { CrudType } from '../../../components/crud/crud.component';
import { CircuitModelType, CircuitsService } from '../../../services/circuits.service';

@Component({
  selector: 'rm-admin-circuits',
  templateUrl: './circuitsAdmin.page.html',
})
export class CircuitsAdminPageComponent implements OnInit {
  columns = ['name', 'countryCode', 'latitude', 'longitude'];

  crud: CrudType<CircuitModelType> = {
    getAll: () => this.circuitsService.get(),
    create: (circuit) => this.circuitsService.create(circuit),
    update: (circuit) => this.circuitsService.update(circuit),
    remove: (circuit) => this.circuitsService.remove(circuit),
  };

  constructor(public circuitsService: CircuitsService) { }

  ngOnInit(): void {
    this.circuitsService.get();
  }
}

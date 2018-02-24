import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { toStream } from 'mobx-utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { TeamsService } from '../../../services/teams.service';

@Component({
  selector: 'rm-admin-teams',
  templateUrl: './teamsAdmin.page.html',
  styleUrls: ['./teamsAdmin.page.scss'],
})
export class TeamsAdminPageComponent  implements OnInit {
  displayedColumns = ['select', 'name'];
  teams = Observable.from(toStream(() => this.teamsService.teams));
  selection = new SelectionModel<Element>(true, []);

  constructor(private teamsService: TeamsService) { }

  private isAllSelected() {
    return this.selection.selected.length === this.teamsService.teams.length;
  }

  private toggleAll() {
    this.isAllSelected() ?
       this.selection.clear() :
       this.teamsService.teams.forEach(row => this.selection.select(row));
  }

  ngOnInit(): void {
    this.teamsService.get();
  }
}

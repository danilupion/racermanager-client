import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { reaction } from 'mobx';

import { UsersService } from '../../../../services/users.service';
import { LeaguesService } from '../../../../services/leagues.service';
import { alphabeticalOrder } from '../../../../utils/sorting';


@Component({
  templateUrl: './leagueUsersAdminDialog.component.html',
})
export class LeagueUsersAdminDialogComponent implements OnInit, OnDestroy {
  public loading = false;

  public league;

  public userOptions = [];

  public selectedUser = new FormControl('', [
    Validators.required,
  ]);

  public selectedMoney = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\d+(\.\d+)?)$/i),
  ]);

  private userItemsReactionDisposer;

  constructor(
    private dialogRef: MatDialogRef<LeagueUsersAdminDialogComponent>,
    private snackBar: MatSnackBar,
    public usersService: UsersService,
    private leaguesService: LeaguesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.league = data.league;
  }

  public setLoading(loading) {
    this.loading = loading;
  }

  public refreshUserOptions() {
    this.userOptions =  this.usersService.items
      .map(user => ({
        value: user.id,
        text: `${user.username} (${user.email})`,
      }))
      .sort((user1, user2) => alphabeticalOrder(user1.text, user2.text));
  }

  private close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userItemsReactionDisposer = reaction(
      () => this.usersService.items.map(i => i),
      this.refreshUserOptions.bind(this),
    );

    this.usersService.get();
  }

  public isValid(): boolean {
    return this.selectedUser.valid && this.selectedMoney.valid;
  }

  public async addUser() {
    try {
      await this.leaguesService.addUser(this.league, this.selectedUser.value, this.selectedMoney.value);
      this.selectedUser.reset();
      this.selectedMoney.reset();
    } catch (err) {
      this.snackBar.open('There was a problem adding the user, make sure it is not already in the league.', null, { duration: 3000 });
    }
  }

  public async removeUser(user) {
    try {
      if (confirm(`Are you sure you want to delete user ${user.email}`)) {
        await this.leaguesService.removeUser(this.league, user);
      }
    } catch (err) {
      this.snackBar.open('There was a problem removing the user.', null, { duration: 3000 });
    }
  }

  ngOnDestroy(): void {
    console.log('destroying');
    this.userItemsReactionDisposer();
  }
}

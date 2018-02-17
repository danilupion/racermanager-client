import { Component } from '@angular/core';
import { UsersService } from '../../services/api/users.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'rm-admin',
  templateUrl: './main.page.html',
})
export class MainPageComponent {
  title = 'Racer Manager';
}

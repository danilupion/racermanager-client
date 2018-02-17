import { Component } from '@angular/core';
import { UsersService } from '../../services/api/users.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'rm-admin',
  templateUrl: './admin.page.html',
})
export class AdminPageComponent {
  title = 'Admin';
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FieldValidator } from '../../../utils/fieldValidator';

@Component({
  selector: 'rm-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  repeatedPassword = '';
  loading = false;
  myForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private fieldValidator: FieldValidator,
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      emailValidate: ['', [Validators.required, this.fieldValidator.validateEmail]],
      passwordValidate: ['', [Validators.required, this.fieldValidator.validatePassword]],
    });
  }

  async register() {
    try {
      this.loading = true;
      await this.usersService.create(this.username, this.email, this.password);
    } catch (err) {
      this.snackBar.open('There was an error creating the user', null, {duration: 3000});
    } finally {
      this.loading = false;
    }
  }

  validate(): boolean {
    return !!this.username
    && !!this.password
    && !!this.password
    && this.password === this.repeatedPassword;
  }
}

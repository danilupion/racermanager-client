import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FieldValidator {

  public validateEmail(control: AbstractControl) {
    const match = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!control.value.match(match)) {
      return { errorUrl: true };
    }
    return null;
  }

  public validatePassword(control: AbstractControl) {
    const match = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%\^\&*\)\(\]\[\+=\.,_-]).{8,}$/;
    if (!control.value.match(match)) {
      return { errorPass: true };
    }
    return null;
  }
}

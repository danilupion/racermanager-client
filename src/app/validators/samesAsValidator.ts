import { AbstractControl, ValidatorFn } from '@angular/forms';

export function sameAsValidator(referenceControl: AbstractControl): ValidatorFn {
  let observedControl;

  referenceControl.valueChanges.subscribe((a) => {
    if (observedControl) {
      observedControl.updateValueAndValidity();
    }
  });

  return (control: AbstractControl): {[key: string]: any} => {
    observedControl = control;
    control.markAsTouched();

    return control.value !== referenceControl.value
      ? {samesAsValidator: { value: control.value } }
      : null;
  };
}

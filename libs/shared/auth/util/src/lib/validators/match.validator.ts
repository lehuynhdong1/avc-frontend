import { AbstractControl, ValidationErrors } from '@angular/forms';

export function MatchValidator(
  matchTo: string // name of the control to match to
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value ===
        (control.parent.controls as {
          [key: string]: AbstractControl;
        })[matchTo].value
      ? null
      : { isMatching: false };
  };
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'adc-frontend-error-hint',
  templateUrl: './error-hint.component.html',
  styleUrls: ['./error-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHintComponent {
  @Input() name: string;
  @Input() errors: ValidationErrors | null | undefined = null;
  @Input() errorChecks:
    | { required?: boolean; minlength?: boolean; maxlength?: boolean }
    | null
    | undefined = null;
}

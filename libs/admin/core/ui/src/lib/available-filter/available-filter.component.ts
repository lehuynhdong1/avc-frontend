import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ActivationStatuses, Empty, ActivationStatus } from '@shared/util';
import { FormControl } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { debounceTime, map, share } from 'rxjs/operators';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Component({
  selector: 'adca-available-filter',
  templateUrl: './available-filter.component.html',
  styleUrls: ['./available-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class AvailableFilterComponent implements OnInit {
  readonly IS_AVAILABLE_VALUES: ReadonlyArray<ActivationStatuses> = ['All', 'Active', 'Inactive'];

  @Input() value = 'All';
  @Input() size: TuiSizeS | TuiSizeL = 'l';
  @Output() valueChange = new EventEmitter<boolean | undefined>();

  readonly isAdmin$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Admin'),
    share()
  );

  readonly control = new FormControl('');

  constructor(private state: RxState<Empty>, private store: Store) {
    this.state.hold(this.control.valueChanges.pipe(debounceTime(200)), (value) => {
      const isAvailableValue = ActivationStatus[value as ActivationStatuses];
      this.valueChange.emit(isAvailableValue);
    });
  }

  ngOnInit() {
    this.control.setValue(this.value);
  }
}

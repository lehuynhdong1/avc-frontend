import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import { ManagerState, LoadManagerById } from '@shared/features/manager/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfirmDialogService } from '@admin/core/ui';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@admin/core/ui';
import { ToggleActivation } from '@shared/features/account/data-access';
import { ShowNotification, hasValue } from '@shared/util';

const DICTIONARY = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Princess Leia' },
  { id: 3, name: 'Darth Vader' },
  { id: 4, name: 'Han Solo' },
  { id: 5, name: 'Obi-Wan Kenobi' },
  { id: 6, name: 'Yoda' }
];

const getConfirmDialogParams: (isActivated: boolean) => ConfirmDialogComponentParams = (
  isActivated
) => ({
  content: `Do you really want to ${isActivated ? 'deactivate' : 'activate'} this manager?`,
  buttons: [
    {
      id: 1,
      label: isActivated ? 'Deactivate' : 'Activate'
    },
    {
      id: 2,
      label: 'Cancel',
      uiOptions: {
        appearance: TuiAppearance.Outline
      }
    }
  ]
});
@Component({
  selector: 'adca-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  readonly BADGE_PRIMARY = TuiStatus.Primary as const;
  readonly form = this.formBuilder.group({
    isAvailable: [false, Validators.required],
    cars: [[1, 2]]
  });
  readonly selectedManager$ = this.store.select(ManagerState.selectedManager).pipe(hasValue());
  private readonly errorMessage$ = this.store.select(ManagerState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<boolean>();

  /* Side effects */
  private whenClickActivate$ = this.clickActivate$.pipe(
    switchMap((currentValue) =>
      this.confirmDialogService.open('Hello', getConfirmDialogParams(currentValue))
    ),
    filter((response) => response === 1),
    map(() => this.form.get('isAvailable')?.value)
  );
  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>,
    private formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadManagerById({ id })));
    this.state.hold(this.selectedManager$, (manager) => {
      this.form.patchValue({ isAvailable: manager?.isAvailable });
    });
    this.state.hold(
      this.whenClickActivate$.pipe(withLatestFrom(this.id$)),
      ([currentStatus, id]) => {
        this.store.dispatch(new ToggleActivation({ id, currentValue: currentStatus }));
      }
    );
    this.state.hold(
      this.whenToggleActivationFailed$.pipe(withLatestFrom(this.errorMessage$)),
      ([, errorMessage]) => {
        this.store.dispatch(
          new ShowNotification({
            message: errorMessage ?? 'Something',
            options: { label: errorMessage }
          })
        );
      }
    );
  }

  toggleActivation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.clickActivate$.next(this.form.get('isAvailable')?.value);
  }
}

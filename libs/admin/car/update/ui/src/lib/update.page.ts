import { CanShowUnsavedDialog } from '@admin/core/util';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { RxState } from '@rx-angular/state';
import { RoleReadDto, AccountManagerDetailReadDto } from '@shared/api';
import { LoginState } from '@shared/auth/login/data-access';
import {
  LoadCarById,
  CarState,
  UpdateCarManagedBy,
  LoadApprovedCars
} from '@shared/features/car/data-access';
import { hasValue, ShowNotification } from '@shared/util';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiNotification } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { LoadManagers, ManagerState } from '@shared/features/manager/data-access';
import { distinctUntilChanged, filter, map, skip, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'adca-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UpdatePage implements CanShowUnsavedDialog {
  willShowUnsavedDialog = false;

  form = this.formBuilder.group({
    managedBy: [null, Validators.required]
  });

  car$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  roles$ = this.store.select(LoginState.roles).pipe(hasValue());
  managers$ = this.store.select(ManagerState.managers).pipe(
    hasValue(),
    map((managers) => managers.result || [])
  );

  /* Actions */
  clickUpdate$ = new Subject<void>();
  clickDiscard$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Record<string, never>>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.declareUpdateSideEffects();
  }

  @tuiPure
  stringifyRoles(roles: Array<RoleReadDto>): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(roles.map(({ id, name }) => [id, name] as [number, string]));
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  @tuiPure
  stringifyManagers(
    managers: Array<AccountManagerDetailReadDto>
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      managers.map(
        ({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`] as [number, string]
      )
    );
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  private declareUpdateSideEffects() {
    this.store.dispatch(new LoadManagers({ limit: 10 }));
    const id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    this.state.hold(id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(this.car$, ({ managedBy }) =>
      this.form.patchValue({ managedBy: managedBy?.id })
    );

    this.clickUpdateEffects();
    this.clickDiscardEffects();
    this.updateErrorEffects();
    this.updateSuccessEffects();
    this.handleUnsavedChangedDialogEffects();
  }

  private handleUnsavedChangedDialogEffects() {
    const formHasChanged$ = this.form.valueChanges.pipe(
      skip(1),
      map(() => this.willShowUnsavedDialog),
      distinctUntilChanged()
    );
    this.state.hold(formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }

  private updateSuccessEffects() {
    const whenUpdateSuccess$ = this.actions
      .pipe<UpdateCarManagedBy>(ofActionSuccessful(UpdateCarManagedBy))
      .pipe(withLatestFrom(this.car$));
    this.state.hold(whenUpdateSuccess$, ([, car]) => {
      this.willShowUnsavedDialog = false;
      this.store.dispatch([
        new ShowNotification({
          message: `${car.name ?? ''} has been updated successfully.`,
          options: { label: 'Update Car', status: TuiNotification.Success, hasIcon: true }
        }),
        new LoadApprovedCars({ limit: 10 })
      ]);
      this.router.navigateByUrl('/car');
    });
  }

  private updateErrorEffects() {
    const errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
    const messagesWhenFailed$ = this.actions
      .pipe<UpdateCarManagedBy>(ofActionErrored(UpdateCarManagedBy))
      .pipe(withLatestFrom(errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Update Car', status: TuiNotification.Error }
        })
      );
    });
  }

  private clickUpdateEffects() {
    const whenUpdateValid$ = this.clickUpdate$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value),
      withLatestFrom(this.car$)
    );
    this.state.hold(whenUpdateValid$, ([form, carInStore]) => {
      const { managedBy } = form;
      this.store.dispatch(
        new UpdateCarManagedBy({
          carManagedByUpdateDto: { carId: carInStore.id, managerId: managedBy }
        })
      );
    });
  }
  private clickDiscardEffects() {
    this.state.hold(this.clickDiscard$, () => {
      this.willShowUnsavedDialog = false;
      const detailPageRoute = this.router.url.replace('update/', '');
      this.router.navigateByUrl(detailPageRoute);
    });
  }
}

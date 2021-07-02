import { CanShowUnsavedDialog } from '@admin/core/util';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { RxState } from '@rx-angular/state';
import { RoleReadDto, AccountManagerDetailReadDto } from '@shared/api';
import { LoginState } from '@shared/auth/login/data-access';
import {
  LoadStaffById,
  LoadStaffs,
  StaffState,
  UpdateStaff,
  UpdateStaffManagedBy
} from '@shared/features/staff/data-access';
import { hasValue, ShowNotification, Role } from '@shared/util';
import { TuiContextWithImplicit, TuiInputType, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiNotification } from '@taiga-ui/core';
import { TuiMarkerIconMode, TuiStatus } from '@taiga-ui/kit';
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
  readonly ROLE_STAFF = Role.STAFF as const;
  readonly TUI_INPUT_PASSWORD = TuiInputType.Password as const;
  readonly TUI_INPUT_EMAIL = TuiInputType.Email as const;
  readonly MARKER_LINK = TuiMarkerIconMode.Link as const;
  readonly BADGE_PRIMARY = TuiStatus.Primary as const;

  willShowUnsavedDialog = false;

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    roleId: ['', Validators.required],
    managedBy: [null]
  });

  staff$ = this.store.select(StaffState.selectedStaff).pipe(hasValue());
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
      managers.map(({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`])
    );
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  private declareUpdateSideEffects() {
    const id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    this.state.hold(id$, (id) => this.store.dispatch(new LoadStaffById({ id })));

    this.state.hold(this.staff$, ({ firstName, lastName, phone, managedBy }) => {
      this.form.patchValue({ firstName, lastName, phone, roleId: Role.STAFF, managedBy });
    });

    this.clickUpdateEffects();
    this.clickDiscardEffects();
    this.whenRoleIsStaffEffects();

    const errorMessage$ = this.store.select(StaffState.errorMessage).pipe(hasValue());
    const messagesWhenFailed$ = this.actions
      .pipe<UpdateStaff>(ofActionErrored(UpdateStaff))
      .pipe(withLatestFrom(errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Update Staff', status: TuiNotification.Error }
        })
      );
    });

    const whenUpdateSuccess$ = this.actions.pipe<UpdateStaff>(ofActionSuccessful(UpdateStaff));
    this.state.hold(whenUpdateSuccess$, ({ params: { accountUpdateDto } }) => {
      this.willShowUnsavedDialog = false;
      this.store.dispatch([
        new ShowNotification({
          message: `${accountUpdateDto?.firstName ?? ''} 
                    ${accountUpdateDto?.lastName ?? ''} has been updated successfully.`,
          options: { label: 'Update Staff', status: TuiNotification.Success, hasIcon: true }
        }),
        new LoadStaffs({ limit: 10 })
      ]);
      this.router.navigateByUrl('/staff');
    });

    const formHasChanged$ = this.form.valueChanges.pipe(
      skip(1), // Skip check for the first time patchValue from Store
      map(() => this.willShowUnsavedDialog),
      distinctUntilChanged()
    );

    this.state.hold(formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }

  private clickUpdateEffects() {
    const whenUpdateValid$ = this.clickUpdate$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value),
      withLatestFrom(this.staff$)
    );
    this.state.hold(whenUpdateValid$, ([form, staffInStore]) => {
      const { firstName, lastName, phone, roleId, managedBy } = form;
      if (staffInStore.managedBy !== managedBy)
        this.store.dispatch(
          new UpdateStaffManagedBy({
            accountManagedByUpdateDto: { staffId: staffInStore.id, managerId: managedBy }
          })
        );

      this.store.dispatch(
        new UpdateStaff({
          id: staffInStore.id || 0,
          accountUpdateDto: { firstName, lastName, phone, roleId }
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
  private whenRoleIsStaffEffects() {
    const whenIsStaff$ = this.form.get('roleId')?.valueChanges.pipe(
      filter((roleId) => roleId === Role.STAFF),
      withLatestFrom(this.store.select(ManagerState.managers)),
      filter(([, managers]) => !managers)
    );
    if (whenIsStaff$)
      this.state.hold(whenIsStaff$, () => this.store.dispatch(new LoadManagers({ limit: 10 })));
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import {
  StaffState,
  CreateStaff,
  LoadStaffs,
  UpdateStaff
} from '@shared/features/staff/data-access';
import { TuiMarkerIconMode, TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { withLatestFrom, map, filter, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { ShowNotification, hasValue } from '@shared/util';
import { LoadManagers, ManagerState } from '@shared/features/manager/data-access';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler, TuiInputType } from '@taiga-ui/cdk';
import { AccountManagerReadDto } from '@shared/api';
import { CanShowUnsavedDialog } from '@admin/core/util';
import { ActivatedRoute } from '@angular/router';

const INIT_FORM_VALUE = {
  firstName: '',
  password: '',
  email: '',
  lastName: '',
  avatarImage: undefined,
  phone: '',
  managedBy: null
};
@Component({
  selector: 'adca-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class CreatePage implements CanShowUnsavedDialog {
  readonly TUI_INPUT_PASSWORD = TuiInputType.Password as const;
  readonly TUI_INPUT_EMAIL = TuiInputType.Email as const;
  readonly MARKER_LINK = TuiMarkerIconMode.Link as const;
  readonly BADGE_PRIMARY = TuiStatus.Primary as const;

  willShowUnsavedDialog = false;

  readonly form = this.formBuilder.group({
    firstName: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    lastName: ['', Validators.required],
    avatarImage: [null, Validators.required],
    phone: ['', Validators.required],
    managedBy: [null],
    clearWhenSuccess: [true]
  });

  private id$ = this.activatedRoute.params.pipe(map(({ id }) => id));
  private readonly errorMessage$ = this.store.select(StaffState.errorMessage).pipe(hasValue());
  formHasChanged$ = this.form.valueChanges.pipe(
    // Skip when implement update
    // skip(1),
    map(() => this.willShowUnsavedDialog),
    distinctUntilChanged()
  );
  readonly managers$ = this.store.select(ManagerState.managers).pipe(
    hasValue(),
    map((managers) => managers.result || [])
  );
  isUpdatePage$ = this.id$.pipe(shareReplay(1));

  /* Actions */
  readonly clickSubmit$ = new Subject<boolean>();
  readonly clickChangeAvatar$ = new Subject<Event | null>();

  /* Side effects */
  private whenCreateSuccess$ = this.actions.pipe<CreateStaff>(ofActionSuccessful(CreateStaff));
  private whenCreateFailed$ = this.actions.pipe<CreateStaff>(ofActionErrored(CreateStaff));
  private whenUpdateSuccess$ = this.actions.pipe<UpdateStaff>(ofActionSuccessful(UpdateStaff));
  private whenUpdateFailed$ = this.actions.pipe<UpdateStaff>(ofActionErrored(UpdateStaff));

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Record<string, never>>,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.store.dispatch(new LoadManagers({ limit: 10 }));
    this.declareCreateSideEffects();
  }

  private declareCreateSideEffects() {
    const whenSubmitValid$ = this.clickSubmit$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value)
    );
    this.state.hold(whenSubmitValid$, (form) => {
      const { firstName, password, email, lastName, avatarImage, phone, managedBy } = form;
      this.store.dispatch(
        new CreateStaff({ firstName, password, email, lastName, avatarImage, phone, managedBy })
      );
    });
    const messagesWhenFailed$ = this.whenCreateFailed$.pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Create Staff', status: TuiNotification.Error }
        })
      );
    });
    this.state.hold(this.whenCreateSuccess$, ({ params }) => {
      this.store.dispatch([
        new ShowNotification({
          message: `${params.firstName} ${params.lastName} has been created successfully.`,
          options: { label: 'Create Staff', status: TuiNotification.Success, hasIcon: true }
        }),
        new LoadStaffs({ limit: 10 })
      ]);
    });
    this.state.hold(
      this.whenCreateSuccess$.pipe(filter(() => this.form.value.clearWhenSuccess)),
      () => {
        this.form.patchValue(INIT_FORM_VALUE);
        this.willShowUnsavedDialog = false;
      }
    );
    this.state.hold(
      this.clickChangeAvatar$.pipe(
        filter((event) => !!(event?.target as HTMLInputElement)?.files?.length),
        map((event) => (event?.target as HTMLInputElement).files)
      ),
      (files) => this.form.patchValue({ avatarImage: files && files[0] })
    );
    this.state.hold(this.formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }

  @tuiPure
  stringify(items: AccountManagerReadDto[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(
        ({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`] as [number, string]
      )
    );
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}

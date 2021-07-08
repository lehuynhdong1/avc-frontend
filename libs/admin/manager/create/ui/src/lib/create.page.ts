import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { ManagerState, CreateManager, LoadManagers } from '@shared/features/manager/data-access';
import { TuiMarkerIconMode, TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { withLatestFrom, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { ShowNotification, hasValue, Empty, CanShowUnsavedDialog } from '@shared/util';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler, TuiInputType } from '@taiga-ui/cdk';
import { AccountManagerDetailReadDto } from '@shared/api';
import { MAXIMUM_IMAGE_SIZE } from '@admin/train-model/upload-image/data-access';

const INIT_FORM_VALUE = {
  firstName: '',
  password: '',
  email: '',
  lastName: '',
  avatarImage: undefined,
  phone: ''
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
  readonly MAXIMUM_IMAGE_SIZE = MAXIMUM_IMAGE_SIZE;
  willShowUnsavedDialog = false;

  readonly form = this.formBuilder.group({
    firstName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    email: ['', [Validators.required, Validators.email]],
    lastName: ['', Validators.required],
    avatarImage: [null],
    phone: [''],
    clearWhenSuccess: [true, Validators.required]
  });

  private readonly errorMessage$ = this.store.select(ManagerState.errorMessage).pipe(hasValue());
  formHasChanged$ = this.form.valueChanges.pipe(
    map(() => this.willShowUnsavedDialog),
    distinctUntilChanged()
  );
  readonly managers$ = this.store.select(ManagerState.managers).pipe(
    hasValue(),
    map((managers) => managers.result || [])
  );

  /* Actions */
  readonly clickCreate$ = new Subject<boolean>();
  readonly clickChangeAvatar$ = new Subject<Event | null>();

  /* Side effects */
  private whenCreateSuccess$ = this.actions.pipe<CreateManager>(ofActionSuccessful(CreateManager));
  private whenCreateFailed$ = this.actions.pipe<CreateManager>(ofActionErrored(CreateManager));

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>,
    private formBuilder: FormBuilder
  ) {
    this.store.dispatch(new LoadManagers({ limit: 10 }));
    this.declareCreateSideEffects();
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

  private declareCreateSideEffects() {
    const whenCreateValid$ = this.clickCreate$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value)
    );
    this.state.hold(whenCreateValid$, (form) => {
      const { firstName, password, email, lastName, avatarImage, phone } = form;

      this.store.dispatch(
        new CreateManager({
          firstName,
          password,
          email,
          lastName,
          avatarImage,
          phone: phone ? phone.replace('+84', '') : undefined
        })
      );
    });
    const messagesWhenFailed$ = this.whenCreateFailed$.pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Create Manager', status: TuiNotification.Error }
        })
      );
    });
    this.state.hold(this.whenCreateSuccess$, ({ params }) => {
      this.store.dispatch([
        new ShowNotification({
          message: `${params?.firstName} ${params?.lastName} has been created successfully.`,
          options: { label: 'Create Manager', status: TuiNotification.Success, hasIcon: true }
        }),
        new LoadManagers({ limit: 10 })
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
}

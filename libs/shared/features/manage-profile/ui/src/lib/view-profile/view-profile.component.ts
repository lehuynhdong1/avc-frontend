import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, Store, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';
import { Subject } from 'rxjs';
import { ShowNotification, hasValue } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { TuiMarkerIconMode } from '@taiga-ui/kit';
import { TuiNotification } from '@taiga-ui/core';
import { ManageProfileState, UpdateProfile } from '@shared/features/manage-profile/data-access';

@Component({
  selector: 'adc-frontend-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ViewProfileComponent {
  readonly MARKER_LINK = TuiMarkerIconMode.Link as const;

  me$ = this.store.select(LoginState.account);

  readonly form = this.formBuilder.group({
    avatarImage: [null],
    phone: ['', Validators.required]
  });
  private readonly errorMessage$ = this.store
    .select(ManageProfileState.errorMessage)
    .pipe(hasValue());

  readonly clickChangeAvatar$ = new Subject<Event | null>();
  readonly clickUpdate$ = new Subject<void>();
  readonly loading$ = this.state.select('loading');

  /* Side effects */
  private whenUpdateSuccess$ = this.actions.pipe<UpdateProfile>(ofActionSuccessful(UpdateProfile));
  private whenUpdateFailed$ = this.actions.pipe<UpdateProfile>(ofActionErrored(UpdateProfile));

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<{ loading: boolean }>,
    private formBuilder: FormBuilder
  ) {
    this.state.hold(this.me$, (my) => this.form.get('phone')?.setValue(my?.phone ?? ''));
    this.state.hold(
      this.clickChangeAvatar$.pipe(
        filter((event) => !!(event?.target as HTMLInputElement)?.files?.length),
        map((event) => (event?.target as HTMLInputElement).files)
      ),
      (files) => {
        this.form.patchValue({ avatarImage: files && files[0] });

        this.store.dispatch(
          new ShowNotification({
            message: 'You need to click "Update Profile" button to apply changes',
            options: { label: 'Update Profile', status: TuiNotification.Warning }
          })
        );
      }
    );

    const whenUpdateValid$ = this.clickUpdate$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value)
    );
    this.state.hold(whenUpdateValid$, (form) => {
      const { avatarImage, phone } = form;
      this.state.set({ loading: true });

      this.store.dispatch(
        new UpdateProfile({
          avatarImage: avatarImage ?? undefined,
          phone: phone ? phone.replace('+84', '') : undefined
        })
      );
    });
    const messagesWhenFailed$ = this.whenUpdateFailed$.pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.state.set({ loading: false });
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Update Profile', status: TuiNotification.Error }
        })
      );
    });
    this.state.hold(this.whenUpdateSuccess$, () => {
      this.state.set({ loading: false });

      this.store.dispatch(
        new ShowNotification({
          message: `Your profile has been updated successfully.`,
          options: { label: 'Update Profile', status: TuiNotification.Success, hasIcon: true }
        })
      );
    });
    this.state.hold(
      this.whenUpdateSuccess$.pipe(filter(() => this.form.value.clearWhenSuccess)),
      () => {
        // this.willShowUnsavedDialog = false;
      }
    );
  }
}

import { RxState } from '@rx-angular/state';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import {
  ToggleApprove,
  CarState,
  LoadApprovedCars,
  LoadUnapprovedCars
} from '@shared/features/car/data-access';
import { withLatestFrom, filter, map, distinctUntilChanged } from 'rxjs/operators';
import { TuiNotification } from '@taiga-ui/core';
import { hasValue, Empty, ShowNotification, CanShowUnsavedDialog } from '@shared/util';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure, TuiContextWithImplicit, TuiStringHandler } from '@taiga-ui/cdk';
import { AccountManagerDetailReadDto } from '@shared/api';
import { TuiMarkerIconMode } from '@taiga-ui/kit';
import { MAXIMUM_IMAGE_SIZE } from '@admin/train-model/train-by-images/data-access';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';

@Component({
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ApprovePage implements CanShowUnsavedDialog {
  readonly MARKER_LINK = TuiMarkerIconMode.Link as const;
  readonly MAXIMUM_IMAGE_SIZE = MAXIMUM_IMAGE_SIZE;

  willShowUnsavedDialog = false;

  form = this.formBuilder.group({
    imageFile: [null],
    name: ['', Validators.required],
    managedBy: [null]
  });

  idAndDeviceId$ = this.activatedRoute.queryParams.pipe(
    map(({ id, deviceId }) => ({ id, deviceId }))
  );
  managers$ = this.store.select(ManagerState.managers).pipe(
    hasValue(),
    map((managers) => managers.result || [])
  );

  /* Actions */
  readonly clickApprove$ = new Subject<void>();
  readonly clickChangeAvatar$ = new Subject<Event | null>();
  readonly clickDiscard$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private actions: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    this.store.dispatch(new LoadManagers({ isAvailable: true }));
    this.declareSideEffects();
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

  private declareSideEffects() {
    this.clickApproveEffects();
    this.clickDiscardEffects();
    this.updateErrorEffects();
    this.updateSuccessEffects();
    this.changeAvatarEffects();
    this.formChangeEffects();
  }

  private updateSuccessEffects() {
    const whenUpdateSuccess$ = this.actions.pipe<ToggleApprove>(ofActionSuccessful(ToggleApprove));
    this.state.hold(whenUpdateSuccess$, ({ params }) => {
      this.willShowUnsavedDialog = false;
      this.store.dispatch([
        new ShowNotification({
          message: `${params.name ?? ''} has been updated successfully.`,
          options: { label: 'Approve Car', status: TuiNotification.Success, hasIcon: true }
        }),
        new LoadUnapprovedCars(),
        new LoadApprovedCars({ limit: 10 })
      ]);
      this.router.navigate(['..', params.id], { relativeTo: this.activatedRoute });
    });
  }

  private updateErrorEffects() {
    const errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
    const messagesWhenFailed$ = this.actions
      .pipe<ToggleApprove>(ofActionErrored(ToggleApprove))
      .pipe(withLatestFrom(errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Approve Car', status: TuiNotification.Error }
        })
      );
    });
  }

  private changeAvatarEffects() {
    this.state.hold(
      this.clickChangeAvatar$.pipe(
        filter((event) => !!(event?.target as HTMLInputElement)?.files?.length),
        map((event) => (event?.target as HTMLInputElement).files)
      ),
      (files) => this.form.patchValue({ imageFile: files && files[0] })
    );
  }

  private formChangeEffects() {
    const formHasChanged$ = this.form.valueChanges.pipe(
      map(() => this.willShowUnsavedDialog),
      distinctUntilChanged()
    );
    this.state.hold(formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }

  private clickApproveEffects() {
    const whenApproveValid$ = this.clickApprove$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value),
      withLatestFrom(this.idAndDeviceId$)
    );
    this.state.hold(whenApproveValid$, ([form, { id }]) => {
      const { name, imageFile, managedBy } = form;
      this.store.dispatch(
        new ToggleApprove({
          id,
          isApproved: true,
          name,
          imageFile,
          managedBy
        })
      );
    });
  }

  private clickDiscardEffects() {
    this.state.hold(this.clickDiscard$, () => {
      this.willShowUnsavedDialog = false;
      this.router.navigate(['..', 'unapproved'], { relativeTo: this.activatedRoute });
    });
  }
}

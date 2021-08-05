import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { CarState, LoadCarById, UpdateCar } from '@shared/features/car/data-access';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom } from 'rxjs/operators';
import { Empty, hasValue, ShowNotification } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  templateUrl: './edit-config.page.html',
  styleUrls: ['./edit-config.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class EditConfigPage implements OnInit {
  id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());

  /* Actions */
  save$ = new Subject<File>();

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {}

  ngOnInit() {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));

    this.state.hold(this.save$.pipe(withLatestFrom(this.id$)), ([file, id]) => {
      this.store.dispatch(new UpdateCar({ config: { id, configFile: file } }));
    });

    const whenUpdateSuccess$ = this.actions.pipe<UpdateCar>(ofActionSuccessful(UpdateCar));
    this.state.hold(whenUpdateSuccess$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Your configuration has been updated successful.',
          options: { label: 'Update Configuration successful', status: TuiNotification.Success }
        })
      )
    );

    const whenUpdateFailed$ = this.actions.pipe<UpdateCar>(ofActionErrored(UpdateCar));
    this.state.hold(whenUpdateFailed$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Our server has been maintainance. Please try again later.',
          options: { label: 'Update Configuration failed', status: TuiNotification.Error }
        })
      )
    );
  }
}

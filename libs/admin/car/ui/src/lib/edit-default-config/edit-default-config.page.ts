import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import {
  CarState,
  ClearDefaultConfig,
  LoadDefaultConfig,
  UpdateDefaultConfig
} from '@shared/features/car/data-access';
import { Empty, hasValue, ShowNotification } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './edit-default-config.page.html',
  styleUrls: ['./edit-default-config.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class EditDefaultConfigPage implements OnInit, OnDestroy {
  defaultConfigUrl$ = this.store.select(CarState.defaultConfig).pipe(
    hasValue(),
    map(({ configUrl }) => configUrl)
  );

  /* Actions */
  save$ = new Subject<File>();

  constructor(private store: Store, private actions: Actions, private state: RxState<Empty>) {}

  ngOnInit() {
    this.store.dispatch(new LoadDefaultConfig());
    this.state.hold(this.save$, (file) =>
      this.store.dispatch(new UpdateDefaultConfig({ configFile: file }))
    );

    const whenUpdateSuccess$ = this.actions.pipe<UpdateDefaultConfig>(
      ofActionSuccessful(UpdateDefaultConfig)
    );
    this.state.hold(whenUpdateSuccess$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Your configuration has been updated successful.',
          options: { label: 'Update Configuration successful', status: TuiNotification.Success }
        })
      )
    );

    const whenUpdateFailed$ = this.actions.pipe<UpdateDefaultConfig>(
      ofActionErrored(UpdateDefaultConfig)
    );
    this.state.hold(whenUpdateFailed$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Our server has been maintainance. Please try again later.',
          options: { label: 'Update Configuration failed', status: TuiNotification.Error }
        })
      )
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearDefaultConfig());
  }
}

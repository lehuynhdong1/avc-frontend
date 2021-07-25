import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import {
  TrainHistoryState,
  LoadModelById,
  ApplyModelById,
  LoadModels
} from '@admin/train-model/history/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { hasValue, Empty, ShowNotification } from '@shared/util';
import { Subject } from 'rxjs';
import { SignalRState } from '@shared/features/signalr/data-access';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    SUCCESS: TuiStatus.Success
  };

  private id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  readonly selectedModel$ = this.store.select(TrainHistoryState.selectedModel).pipe(hasValue());
  readonly clickApply$ = new Subject<void>();

  /* Side effects */
  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    state.hold(this.id$, (id) => this.store.dispatch(new LoadModelById({ id })));
    this.state.hold(this.clickApply$.pipe(withLatestFrom(this.id$)), ([, id]) =>
      store.dispatch(new ApplyModelById({ id }))
    );
    this.applySuccessEffect();
    this.applyErrorEffect();
    this.signalrEffect();
  }
  private applySuccessEffect() {
    const whenApplySuccess$ = this.actions.pipe<ApplyModelById>(ofActionSuccessful(ApplyModelById));
    this.state.hold(whenApplySuccess$.pipe(withLatestFrom(this.selectedModel$)), ([, model]) =>
      this.store.dispatch([
        new ShowNotification({
          message: `Apply ${model.name} successfully. Every system cars will update whenever they restarted.`,
          options: { label: 'Apply Model', status: TuiNotification.Success }
        }),
        new LoadModelById({ id: model.id || 0 }),
        new LoadModels({ limit: 10 })
      ])
    );
  }

  private applyErrorEffect() {
    const whenApplyError$ = this.actions.pipe<ApplyModelById>(ofActionErrored(ApplyModelById));
    this.state.hold(whenApplyError$.pipe(withLatestFrom(this.selectedModel$)), ([, model]) =>
      this.store.dispatch(
        new ShowNotification({
          message: `Apply ${model.name} failed. Please try again later.`,
          options: { label: 'Apply Model', status: TuiNotification.Error }
        })
      )
    );
  }

  private signalrEffect() {
    const whenCarNotifyMustFetchNewData$ = this.store
      .select(SignalRState.get('WhenModelStatusChanged'))
      .pipe(
        hasValue(),
        withLatestFrom(this.id$),
        filter(([{ modelId }, id]) => modelId === id)
      );
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, id]) =>
      this.store.dispatch([new LoadModelById({ id })])
    );
  }
}

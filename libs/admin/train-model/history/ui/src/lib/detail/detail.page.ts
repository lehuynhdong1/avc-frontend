import { TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import {
  TrainHistoryState,
  LoadModelById,
  ApplyModelById,
  LoadModels,
  LoadLogModelById,
  DownloadImages,
  DownloadLog
} from '@admin/train-model/history/data-access';
import { TuiStatus, TuiMarkerIconMode } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom, filter, take, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { hasValue, Empty, ShowNotification } from '@shared/util';
import { from, Subject, interval } from 'rxjs';
import { SignalRState } from '@shared/features/signalr/data-access';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
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
  TUI_MARKER_SUCCESS = TuiMarkerIconMode.Success;

  private id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  readonly selectedModel$ = this.store.select(TrainHistoryState.selectedModel).pipe(hasValue());
  readonly selectedModelLog$ = this.store.select(TrainHistoryState.selectedModelLog).pipe(
    hasValue(),
    switchMap((log) =>
      from(import('ansi-to-html')).pipe(
        map((converterModule: any) => {
          const converter = new converterModule.default();
          return log
            ? converter.toHtml(log).replace(/<b>/gi, '<b class="text-green-400 mt-2">')
            : '';
        })
      )
    ),
    distinctUntilChanged()
  );
  readonly clickApply$ = new Subject<void>();

  /* Side effects */
  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private tuiDialogService: TuiDialogService
  ) {
    state.hold(this.id$, (id) => this.store.dispatch(new LoadModelById({ id })));
    this.state.hold(this.clickApply$.pipe(withLatestFrom(this.id$)), ([, id]) =>
      store.dispatch(new ApplyModelById({ id }))
    );
    this.applySuccessEffect();
    this.applyErrorEffect();
    this.signalrEffect();
    this.loadModelSuccessEffect();
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

  private loadModelSuccessEffect() {
    const whenLoadSuccess$ = this.actions.pipe<LoadModelById>(ofActionSuccessful(LoadModelById));
    this.state.hold(whenLoadSuccess$, () => this.store.dispatch(new LoadLogModelById()));
  }

  openLog(template: PolymorpheusContent<TuiDialogContext>) {
    const intervalSubscription = interval(3500).subscribe(() =>
      this.store.dispatch(new LoadLogModelById())
    );
    this.tuiDialogService
      .open(template, { size: 'page' })
      .pipe(take(1))
      .subscribe({ complete: () => intervalSubscription.unsubscribe() });
  }

  downloadImages() {
    this.store.dispatch(new DownloadImages());
  }

  downloadLog() {
    this.store.dispatch(new DownloadLog());
  }
}

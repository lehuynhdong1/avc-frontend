import { StartCar, StopCar, SignalRState } from '@shared/features/signalr/data-access';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { hasValue, Empty } from '@shared/util';
import { IssueReadDto } from '@shared/api';
import { Subject, merge, BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    WARNING: TuiStatus.Warning,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  private id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());

  /* Actions */
  toggleRun$ = new Subject<void>();

  private issueLimitSubject = new BehaviorSubject(5);
  issueLimit$ = this.issueLimitSubject.asObservable();

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(this.toggleRun$.pipe(withLatestFrom(this.selectedCar$)), ([, car]) => {
      if (car?.isRunning) this.store.dispatch(new StopCar(car.id || 0));
      else this.store.dispatch(new StartCar(car.id || 0));
    });
    this.signalrEffect();
  }

  trackById(_: number, item: IssueReadDto) {
    return item.id;
  }

  private signalrEffect() {
    type WhenCarNotify =
      | 'WhenCarConnected'
      | 'WhenCarDisconnected'
      | 'WhenCarRunning'
      | 'WhenCarStopping'
      | 'WhenIssueCreated'
      | 'WhenManagerChangeAssignedCar'
      | 'WhenCarDeactivated';

    const carNotifys = [
      'WhenCarConnected',
      'WhenCarDisconnected',
      'WhenCarRunning',
      'WhenCarStopping',
      'WhenIssueCreated'
    ];
    // Merge all to archive only 1 subscription for notification
    const whenCarNotifyMustFetchNewData$ = merge(
      ...carNotifys.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          withLatestFrom(this.id$),
          filter(([{ carId }, id]) => carId === id)
        );
      })
    );
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, id]) =>
      this.store.dispatch(new LoadCarById({ id }))
    );

    const carNotifyMustBack = ['WhenManagerChangeAssignedCar', 'WhenCarDeactivated'];

    const whenCarNotifyMustBack$ = merge(
      ...carNotifyMustBack.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          withLatestFrom(this.id$),
          filter(([{ carId }, id]) => carId === id)
        );
      })
    );
    this.state.hold(whenCarNotifyMustBack$, () => this.router.navigateByUrl('/car'));
  }

  loadMore(event: Event) {
    const car = this.store.selectSnapshot(CarState.selectedCar);
    const currentLimit = this.issueLimitSubject.value;
    if (!car?.issues?.length) return;
    if (currentLimit >= car.issues.length) {
      (event.target as any).disabled = true;
    }
    setTimeout(() => {
      this.issueLimitSubject.next(currentLimit + 5);
      (event.target as any)?.complete();
    }, 1000);
  }
}

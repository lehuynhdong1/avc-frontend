import { StartCar, StopCar } from '@shared/features/signalr/data-access';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom } from 'rxjs/operators';
import { hasValue, Empty } from '@shared/util';
import { IssueReadDto } from '@shared/api';
import { Subject } from 'rxjs';
import { BottomBarVisibilityService } from '@mobile/core/ui';
import { ViewWillLeave } from '@ionic/angular';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage implements ViewWillLeave {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    WARNING: TuiStatus.Warning,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  // private readonly errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());

  /* Actions */
  toggleRun$ = new Subject<void>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private bottomBar: BottomBarVisibilityService
  ) {
    bottomBar.hide();
    const id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    this.state.hold(id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(this.toggleRun$.pipe(withLatestFrom(this.selectedCar$)), ([, car]) => {
      if (car?.isRunning) this.store.dispatch(new StopCar(car.id || 0));
      else this.store.dispatch(new StartCar(car.id || 0));
    });
  }

  trackById(_: number, item: IssueReadDto) {
    return item.id;
  }

  ionViewWillLeave() {
    this.bottomBar.show();
  }
}

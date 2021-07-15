import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { TrainHistoryState, LoadModelById } from '@admin/train-model/history/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { hasValue, Empty } from '@shared/util';

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

  readonly selectedModel$ = this.store.select(TrainHistoryState.selectedModel).pipe(hasValue());

  /* Side effects */
  constructor(private store: Store, activatedRoute: ActivatedRoute, state: RxState<Empty>) {
    const id$ = activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    state.hold(id$, (id) => this.store.dispatch(new LoadModelById({ id })));
  }
}

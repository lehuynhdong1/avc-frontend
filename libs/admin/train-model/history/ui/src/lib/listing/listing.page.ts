import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadModels, TrainHistoryState } from '@admin/train-model/history/data-access';
import { Subject } from 'rxjs';
import { ModelReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Empty, hasValue } from '@shared/util';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { withLatestFrom } from 'rxjs/operators';
import { SignalRState } from '@shared/features/signalr/data-access';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  DYNAMIC_COLUMNS: DynamicTableColumns<ModelReadDto> = [
    { key: 'name', title: 'Name', type: 'string' },
    { key: 'imageCount', title: 'Image Count', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    { key: 'modelStatus', title: 'Status', type: 'string' },
    {
      key: 'isApplying',
      title: 'Applying Status',
      type: 'boolean',
      trueMessage: 'Applying',
      falseMessage: 'None'
    }
  ];

  readonly searchControl = new FormControl('');

  /* Attribute Streams */
  readonly models$ = this.store.select(TrainHistoryState.models);
  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly loadPage$ = new Subject<number>();

  /* Side effects */
  readonly changeSearchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    startWith('')
  );

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    this.whenFilterChangedEffects();
    this.whenLoadPageEffects();
    this.declareSideEffects();
    this.signalrEffect();
  }

  private declareSideEffects() {
    this.state.hold(this.selectRow$, (id) =>
      this.router.navigate([id], { relativeTo: this.activatedRoute })
    );
  }

  private whenFilterChangedEffects() {
    this.state.hold(this.changeSearchValue$, (searchValue) =>
      this.store.dispatch(new LoadModels({ searchValue, limit: 10 }))
    );
  }
  private whenLoadPageEffects() {
    this.state.hold(
      this.loadPage$.pipe(withLatestFrom(this.changeSearchValue$)),
      ([index, searchValue]) =>
        this.store.dispatch(new LoadModels({ searchValue, limit: 10, page: index + 1 }))
    );
  }

  private signalrEffect() {
    const whenCarNotifyMustFetchNewData$ = this.store
      .select(SignalRState.get('WhenModelStatusChanged'))
      .pipe(hasValue(), withLatestFrom(this.changeSearchValue$));
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, searchValue]) =>
      this.store.dispatch([new LoadModels({ searchValue, limit: 10 })])
    );
  }
}

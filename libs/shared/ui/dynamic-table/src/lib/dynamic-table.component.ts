import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { RxState } from '@rx-angular/state';
import { DynamicTableUiState, ColumnType, HasId, Id, PagingResponse } from './models';
import { Subject } from 'rxjs';
import { map, filter, pairwise } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DynamicTableColumns } from './models/ui-state.model';

@Component({
  selector: 'adc-frontend-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DynamicTableComponent<T extends HasId> {
  @Input() columns: DynamicTableColumns<T>;
  @Input() response: PagingResponse<T>;
  @Input() array: Array<T>;
  @Input() indexable = true;
  @Input() paginable = false;
  @Input() selectable = false;

  @Output() selectRow = new EventEmitter<Id>();

  selectedId$ = this.$.select('selectedId');
  readonly selectRow$ = new Subject<Id>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private $: RxState<DynamicTableUiState>
  ) {
    const lastRouteChild = this.activatedRoute.children[this.activatedRoute.children.length - 1];
    if (lastRouteChild) {
      const idFromRoute$ = lastRouteChild.params.pipe(map((params) => parseInt(params.id)));
      this.$.connect('selectedId', idFromRoute$);
    }
    const routerEnd$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      pairwise(),
      // Only when back from listing to detail
      filter(([before, after]) => {
        const beforeUrl = (before as NavigationEnd).url; // manager/:id
        const afterUrl = (after as NavigationEnd).url; // manager
        const detailPagePattern = new RegExp(`^${afterUrl}/\\d+$`);
        const listingPagePattern = new RegExp(`^${afterUrl}$`);

        return detailPagePattern.test(beforeUrl) && listingPagePattern.test(afterUrl);
      })
    );
    this.$.hold(this.selectRow$, (id) => {
      this.$.set({ selectedId: id });
      this.selectRow.emit(id);
    });
    this.$.hold(routerEnd$, () => this.$.set({ selectedId: 0 }));
  }

  @tuiPure
  calcTotalPageCount(count: number | undefined) {
    if (!count) return 1;
    return Math.floor(count / 10) + 1;
  }
  @tuiPure
  getTypeof(value: number | string | boolean) {
    return typeof value;
  }
  @tuiPure
  getKeys(columns: DynamicTableColumns<T>) {
    return ['index', ...columns.map((col) => col.key)];
  }
  @tuiPure
  toDate(value: string) {
    return new Date(value);
  }

  trackByType(_: number, item: ColumnType<T>) {
    return item.type;
  }
}

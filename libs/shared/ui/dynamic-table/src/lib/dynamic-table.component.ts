import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { RxState } from '@rx-angular/state';
import { DynamicTableUiState, ColumnType, HasId, Id, PagingResponse } from './models';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'adc-frontend-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DynamicTableComponent<T extends HasId> {
  @Input() columns: Array<ColumnType<T>>;
  @Input() response: PagingResponse<T>;
  @Input() array: Array<T>;
  @Input() paginable = false;
  @Input() selectable = false;

  @Output() selectRow = new EventEmitter<Id>();

  selectedId$ = this.$.select('selectedId');
  readonly selectRow$ = new Subject<Id>();

  constructor(private $: RxState<DynamicTableUiState>) {
    this.$.hold(
      this.selectRow$.pipe(
        filter(() => this.selectable),
        distinctUntilChanged()
      ),
      (id) => {
        this.$.set({ selectedId: id });
        this.selectRow.emit(id);
      }
    );
  }

  @tuiPure
  calcTotalPageCount(count: number | undefined) {
    if (!count) return 1;
    return Math.round(count / 10) + 1;
  }
  @tuiPure
  getTypeof(value: number | string | boolean) {
    return typeof value;
  }
  @tuiPure
  getKeys(columns: Array<ColumnType<T>>) {
    return ['index', ...columns.map((col) => col.key)];
  }
}

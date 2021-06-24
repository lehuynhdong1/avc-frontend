import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ManagerState, LoadManagerById } from '@shared/features/manager/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

const DICTIONARY = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Princess Leia' },
  { id: 3, name: 'Darth Vader' },
  { id: 4, name: 'Han Solo' },
  { id: 5, name: 'Obi-Wan Kenobi' },
  { id: 6, name: 'Yoda' }
];
@Component({
  selector: 'adca-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  readonly BADGE_PRIMARY = TuiStatus.Primary as const;
  readonly form = this.formBuilder.group({
    isAvailable: [false, Validators.required],
    cars: [[1, 2]]
  });
  readonly selectedManager$ = this.store.select(ManagerState.selectedManager);
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => id));
  private readonly changeCars$: Observable<string> | undefined = this.form
    .get('cars')
    ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged());

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>,
    private formBuilder: FormBuilder
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadManagerById({ id })));
    this.state.hold(this.selectedManager$.pipe(filter((manager) => !!manager)), (manager) => {
      this.form.patchValue({ isAvailable: manager?.isAvailable });
    });
  }
}

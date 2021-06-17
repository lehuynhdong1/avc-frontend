import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ListingState, LoadStaffById } from '@shared/features/staff/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'adca-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  readonly BADGE_PRIMARY = TuiStatus.Primary as const;
  readonly toggleAvailable = new FormControl();
  readonly selectedStaff$ = this.store.select(ListingState.selectedStaff);
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => id));

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadStaffById({ id })));
    this.state.hold(this.selectedStaff$, (staff) =>
      this.toggleAvailable.setValue(staff?.isAvailable)
    );
  }
}

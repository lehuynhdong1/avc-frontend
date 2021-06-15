import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ListingState,
  LoadStaffs,
  StateModel as ListingStateModel
} from '@shared/features/staff/data-access';
import { Observable } from 'rxjs';
import { AccountStaffReadDto } from '@shared/api';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPage {
  @Select(ListingState.staffs) readonly staffs$: Observable<ListingStateModel['listing']>;
  readonly columns: Array<keyof AccountStaffReadDto | 'index' | 'name'> = [
    'index',
    'name',
    'email',
    'phone',
    'managedByEmail',
    'isAvailable'
  ];

  constructor(private store: Store) {
    this.store.dispatch(new LoadStaffs({ limit: 10 }));
  }
}

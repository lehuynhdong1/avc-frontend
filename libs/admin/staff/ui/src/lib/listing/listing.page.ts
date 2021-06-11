import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  AccountTypes,
  ListingState,
  LoadAccounts,
  StateModel as ListingStateModel
} from '@shared/features/staff/data-access';
import { Observable } from 'rxjs';
import { AccountReadDtoPagingResponseDto } from '@shared/api';
@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPage {
  staffs$: Observable<AccountReadDtoPagingResponseDto | null>;

  readonly data = [
    {
      name: 'Alex Inkin',
      balance: 1323525,
      address: '123 Main Street, Suite 330, Boston, MA'
    },
    {
      name: 'Roman Sedov',
      balance: 423242,
      address: '11 Stack Street, Suite 330, Boston, Lost Angular'
    }
  ] as const;

  readonly columns = Object.keys(this.data[0]);

  constructor(private store: Store, activatedRoute: ActivatedRoute) {
    const accountType = activatedRoute.snapshot.data.accountType as AccountTypes;
    console.log(accountType);

    this.staffs$ = this.store.select(ListingState[accountType]);

    this.store.dispatch(new LoadAccounts(accountType, { limit: 10 }));
  }
}

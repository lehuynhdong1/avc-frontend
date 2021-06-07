import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPage implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}

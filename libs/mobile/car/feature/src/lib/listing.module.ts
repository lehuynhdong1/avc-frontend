import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/car/data-access';
import { ListingPage, ListingUiModule } from '@mobile/car/ui';

@NgModule({
  imports: [
    ListingUiModule,
    DataAccessModule,
    RouterModule.forChild([{ path: '', data: { title: 'Cars' }, component: ListingPage }])
  ]
})
export class ListingModule {}

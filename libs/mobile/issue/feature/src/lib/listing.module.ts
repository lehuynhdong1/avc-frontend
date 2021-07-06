import { NgModule } from '@angular/core';
import { DataAccessModule } from '@shared/features/issue/data-access';
import { ListingPage } from '@mobile/issue/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [DataAccessModule, RouterModule.forChild([{ path: '', component: ListingPage }])]
})
export class ListingModule {}

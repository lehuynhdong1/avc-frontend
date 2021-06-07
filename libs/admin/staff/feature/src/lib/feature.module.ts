import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingModule, ListingPage } from '@admin/staff/ui';

@NgModule({
  imports: [
    CommonModule,
    ListingModule,
    RouterModule.forChild([{ path: '', component: ListingPage }])
  ]
})
export class FeatureModule {}

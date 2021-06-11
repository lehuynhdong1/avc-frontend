import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/staff/data-access';
import { ListingModule, ListingPage } from '@admin/staff/ui';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListingPage,
        data: { title: 'Staffs' }
      }
    ]),
    ListingModule
  ]
})
export class FeatureModule {}

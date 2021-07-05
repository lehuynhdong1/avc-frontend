import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnapprovePage } from '@shared/features/car/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: UnapprovePage }])]
})
export class UnapprovedListingModule {}

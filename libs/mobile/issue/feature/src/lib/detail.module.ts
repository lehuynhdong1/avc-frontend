import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailPage } from '@mobile/issue/ui';
import { DataAccessModule as IssueDataAccessModule } from '@shared/features/issue/data-access';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';

@NgModule({
  imports: [
    IssueDataAccessModule,
    CarDataAccessModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: DetailPage }])
  ]
})
export class DetailModule {}

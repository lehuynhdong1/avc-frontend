import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailPage } from '@mobile/issue/ui';
import { DataAccessModule } from '@shared/features/issue/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: DetailPage }])
  ]
})
export class DetailModule {}

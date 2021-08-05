import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditDefaultConfigPage } from '@admin/car/ui';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: EditDefaultConfigPage }])
  ]
})
export class EditDefaultConfigModule {}

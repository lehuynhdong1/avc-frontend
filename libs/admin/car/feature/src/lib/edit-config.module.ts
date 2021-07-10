import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditConfigPage } from '@admin/car/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: EditConfigPage }])]
})
export class EditConfigModule {}

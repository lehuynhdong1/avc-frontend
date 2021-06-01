import { RootRoutingModule } from './root-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RootRoutingModule],
  exports: [RouterModule]
})
export class FeatureModule {}

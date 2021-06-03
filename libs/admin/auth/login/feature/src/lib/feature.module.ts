import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginModule, LoginComponent } from '@admin/auth/login/ui';

export const featureRoutes: Route[] = [
  { path: '', component: LoginComponent, data: { title: 'Login' } }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featureRoutes), LoginModule]
})
export class FeatureModule {}

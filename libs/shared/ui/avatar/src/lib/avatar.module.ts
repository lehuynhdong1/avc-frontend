import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { TuiAvatarModule } from '@taiga-ui/kit';

@NgModule({
  imports: [CommonModule, TuiAvatarModule, AngularSvgIconModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent]
})
export class AvatarModule {}

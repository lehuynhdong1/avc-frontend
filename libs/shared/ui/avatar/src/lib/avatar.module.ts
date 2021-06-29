import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule, TuiAvatarModule, TuiSvgModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent]
})
export class AvatarModule {}

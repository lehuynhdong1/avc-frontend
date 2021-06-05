import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiButtonModule, TuiAvatarModule, TuiSvgModule];
@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, TranslocoModule, RouterModule, ...tuiModules],
  exports: [SidebarComponent]
})
export class SidebarModule {}

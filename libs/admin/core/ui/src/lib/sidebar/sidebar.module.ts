import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiHintModule } from '@taiga-ui/core';

const tuiModules = [TuiButtonModule, TuiSvgModule, TuiHintModule];
@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, TranslocoModule, RouterModule, AvatarModule, tuiModules],
  exports: [SidebarComponent]
})
export class SidebarModule {}

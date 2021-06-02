import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiAvatarModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, TranslocoModule, TuiAvatarModule],
  exports: [SidebarComponent]
})
export class SidebarModule {}

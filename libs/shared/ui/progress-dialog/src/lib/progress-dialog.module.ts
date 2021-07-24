import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressDialogComponent } from './progress-dialog.component';
import { TuiSvgModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule, TuiSvgModule],
  declarations: [ProgressDialogComponent],
  exports: [ProgressDialogComponent]
})
export class ProgressDialogModule {}

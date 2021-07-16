import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDialogComponent } from './image-dialog.component';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
@NgModule({
  declarations: [ImageDialogComponent],
  imports: [CommonModule, TuiButtonModule, TuiBadgeModule, TuiSvgModule],
  exports: [ImageDialogComponent]
})
export class ImageDialogModule {}

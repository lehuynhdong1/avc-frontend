import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDialogComponent } from './image-dialog.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [ImageDialogComponent],
  imports: [CommonModule, TuiButtonModule],
  exports: [ImageDialogComponent]
})
export class ImageDialogModule {}

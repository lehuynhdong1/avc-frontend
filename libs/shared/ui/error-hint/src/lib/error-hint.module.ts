import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHintComponent } from './error-hint.component';
import { TuiSvgModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule, TuiSvgModule],
  declarations: [ErrorHintComponent],
  exports: [ErrorHintComponent]
})
export class ErrorHintModule {}

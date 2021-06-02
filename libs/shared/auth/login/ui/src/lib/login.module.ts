import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLoginComponent } from './login.component';

@NgModule({
  declarations: [SharedLoginComponent],
  imports: [CommonModule],
  exports: [SharedLoginComponent]
})
export class SharedLoginModule {}

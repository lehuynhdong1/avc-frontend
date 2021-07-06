import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackBarComponent } from './back-bar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BackBarComponent],
  imports: [CommonModule, IonicModule],
  exports: [BackBarComponent]
})
export class BackBarModule {}

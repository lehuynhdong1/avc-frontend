import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LanguageModule } from '@shared/language';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LanguageModule, IonicModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}

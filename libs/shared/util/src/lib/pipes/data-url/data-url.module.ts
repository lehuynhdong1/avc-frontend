import { NgModule } from '@angular/core';
import { DataUrlPipe } from './data-url.pipe';

@NgModule({
  declarations: [DataUrlPipe],
  exports: [DataUrlPipe]
})
export class DataUrlPipeModule {}

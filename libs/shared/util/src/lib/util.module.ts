import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { UtilState } from './store/util.state';
import { TuiNotificationsModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule, TuiNotificationsModule, NgxsModule.forFeature([UtilState])]
})
export class UtilModule {}

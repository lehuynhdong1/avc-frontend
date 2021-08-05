import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDefaultConfigPage } from './edit-default-config.page';
import { AvatarModule } from '@shared/ui/avatar';
import { EditConfigComponentModule } from '../shared/edit-config';

@NgModule({
  declarations: [EditDefaultConfigPage],
  imports: [CommonModule, AvatarModule, EditConfigComponentModule],
  exports: [EditDefaultConfigPage]
})
export class EditDefaultConfigModule {}

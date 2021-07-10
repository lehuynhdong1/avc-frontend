import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { EditConfigPage } from './edit-config.page';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditConfigPage],
  imports: [CommonModule, NgJsonEditorModule, AvatarModule, TuiButtonModule, RouterModule],
  exports: [EditConfigPage]
})
export class EditConfigModule {}

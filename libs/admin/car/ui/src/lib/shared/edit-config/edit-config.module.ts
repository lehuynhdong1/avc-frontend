import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { EditConfigComponent } from './edit-config.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [EditConfigComponent],
  imports: [CommonModule, NgJsonEditorModule, TuiButtonModule, RouterModule],
  exports: [EditConfigComponent]
})
export class EditConfigComponentModule {}

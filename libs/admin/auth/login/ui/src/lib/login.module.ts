import { SharedLoginModule } from '@shared/auth/login/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { TuiButtonModule } from '@taiga-ui/core';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedLoginModule, TuiButtonModule]
})
export class LoginModule {}

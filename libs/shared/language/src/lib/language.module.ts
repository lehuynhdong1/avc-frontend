import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { NgxsModule } from '@ngxs/store';
import { LanguageState } from './store/language.state';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  imports: [NgxsModule.forFeature([LanguageState])],
  exports: [TranslocoModule]
})
export class LanguageModule {
  static getImports(
    config?: Partial<TranslocoConfig>
  ): [LanguageModule, ModuleWithProviders<TranslocoRootModule>] {
    return [LanguageModule, TranslocoRootModule.forRoot(config)];
  }
}

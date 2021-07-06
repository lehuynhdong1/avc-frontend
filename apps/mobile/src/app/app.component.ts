import { Component } from '@angular/core';
import { AutoBackBarService } from '@mobile/core/ui';
import { Store } from '@ngxs/store';
import { LoadRoles, LoadToken } from '@shared/auth/login/data-access';
@Component({
  selector: 'adcm-root',
  template: '<ion-app><tui-root class="h-100"><router-outlet></router-outlet></tui-root></ion-app>'
})
export class AppComponent {
  constructor(store: Store, autoTitle: AutoBackBarService) {
    store.dispatch([new LoadToken(), new LoadRoles()]);
    autoTitle.setupAutoTitleListener();
  }
}

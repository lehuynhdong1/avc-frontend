import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadRoles } from '@shared/auth/login/data-access';
@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"><router-outlet></router-outlet></tui-root>'
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(new LoadRoles());
  }
}

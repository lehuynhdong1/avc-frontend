import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadRoles, LoadToken } from '@shared/auth/login/data-access';
import { ReceivedMethods, SignalRService } from '@shared/util';
@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"><router-outlet></router-outlet></tui-root>'
})
export class AppComponent {
  constructor(store: Store, signalr: SignalRService) {
    store.dispatch([new LoadToken(), new LoadRoles()]);
    signalr.register(ReceivedMethods.WhenCarConnected, (res) => {
      console.log(
        '🚀 ~ file: app.component.ts ~ line 13 ~ AppComponent ~ signalr.register ~ res',
        res
      );
    });
    signalr.start();
  }
}

import { Component, OnInit } from '@angular/core';
import { AutoTitleService } from '@shared/util';

@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"> <router-outlet></router-outlet> </tui-root>'
})
export class AppComponent implements OnInit {
  constructor(private autoTitle: AutoTitleService) {}
  ngOnInit(): void {
    this.autoTitle.setupAutoTitleListener({ postfix: ' | AVC' });
  }
}

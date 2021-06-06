import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AutoTitleService } from '@shared/util';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';

@Component({
  selector: 'adca-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'layout', loader } }]
})
export class LayoutComponent implements OnInit {
  constructor(private autoTitle: AutoTitleService) {}
  ngOnInit(): void {
    this.autoTitle.setupAutoTitleListener({ postfix: ' | AVC' });
  }
}

import { Injectable } from '@angular/core';
import { BackBarService } from './back-bar.service';
import { getDeepestChildSnapshot } from '@shared/util';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AutoBackBarService {
  constructor(private backBar: BackBarService, private router: Router) {}

  setupAutoTitleListener() {
    this.router.events.pipe(filter((event) => event instanceof ResolveEnd)).subscribe((event) => {
      const { data } = getDeepestChildSnapshot((event as ResolveEnd).state.root);
      data?.title && this.backBar.setBackBar({ title: data.title });
    });
  }
}

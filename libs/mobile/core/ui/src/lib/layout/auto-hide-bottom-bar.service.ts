import { Injectable, OnDestroy } from '@angular/core';
import { BottomBarVisibilityService } from './bottom-bar-visibility.service';

@Injectable()
export class AutoHideBottomBarService implements OnDestroy {
  constructor(private visibilityService: BottomBarVisibilityService) {
    this.visibilityService.hide();
  }

  ngOnDestroy() {
    this.visibilityService.show();
  }
}

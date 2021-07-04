import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Empty } from '@shared/util';
import { SidebarService } from './sidebar.service';

@Injectable({ providedIn: 'root' })
export class CollapseSidebarResolver implements Resolve<Empty> {
  constructor(private sidebar: SidebarService) {}
  resolve() {
    this.sidebar.collapse();
    return true;
  }
}

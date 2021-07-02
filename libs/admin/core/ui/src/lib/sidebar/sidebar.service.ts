import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private collapseSubject = new BehaviorSubject(false);
  collapse$ = this.collapseSubject.asObservable();

  collapse() {
    this.collapseSubject.next(true);
  }

  expand() {
    this.collapseSubject.next(false);
  }
}

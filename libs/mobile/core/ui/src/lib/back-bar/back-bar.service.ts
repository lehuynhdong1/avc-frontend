import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BackBar {
  fullWidth?: boolean;
  title?: string;
  backTo?: string;
}

const INITIAL_STATE: BackBar = { fullWidth: true, title: 'AVC Mobile', backTo: '/' };

@Injectable({ providedIn: 'root' })
export class BackBarService {
  private backBarSubject = new BehaviorSubject<BackBar>(INITIAL_STATE);
  backBar$ = this.backBarSubject.asObservable();

  setBackBar(backBar: BackBar) {
    this.backBarSubject.next(backBar);
  }
}

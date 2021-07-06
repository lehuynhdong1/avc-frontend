import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BottomBarVisibilityService {
  private _visibleSubject: BehaviorSubject<boolean>;
  visible$: Observable<boolean>;

  constructor() {
    this._visibleSubject = new BehaviorSubject<boolean>(true);
    this.visible$ = this._visibleSubject.asObservable();
  }

  hide() {
    this._visibleSubject.next(false);
  }

  show() {
    this._visibleSubject.next(true);
  }
}

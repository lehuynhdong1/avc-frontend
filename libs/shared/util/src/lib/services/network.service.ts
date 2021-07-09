import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private onlineSubject = new BehaviorSubject(navigator.onLine);
  online$ = this.onlineSubject.asObservable();

  get online() {
    return this.onlineSubject.value;
  }

  registerListeners() {
    window.addEventListener('online', () => this.onlineSubject.next(true));
    window.addEventListener('offline', () => this.onlineSubject.next(false));
  }
}

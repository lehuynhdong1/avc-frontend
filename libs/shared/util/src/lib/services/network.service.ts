import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private window = this.document.defaultView;

  private onlineSubject = new BehaviorSubject(navigator.onLine);
  online$ = this.onlineSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {}

  get online() {
    return this.onlineSubject.value;
  }

  registerListeners() {
    if (!this.window || isPlatformBrowser(this.platformId)) return;
    this.window.addEventListener('online', () => this.onlineSubject.next(true));
    this.window.addEventListener('offline', () => this.onlineSubject.next(false));
  }
}

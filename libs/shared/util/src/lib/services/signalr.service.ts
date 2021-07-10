import { ReceivedResponses, SentMethods, SentParams } from './../models/signalr.model';
import { Injectable, Inject } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { AppConfig, APP_CONFIG } from '@shared/app-config';
import { ReceivedMethods } from './../models';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  connection: HubConnection = new HubConnectionBuilder()
    .withUrl(`${this.appConfig.apiUrl}/hub/`)
    .withAutomaticReconnect()
    .build();

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}
  /**
   * @param  {T} method The name of the method to register handler for
   * @param  {(params:ReceivedResponses[T])=>void} callback The handler, if you intend to remove later, please don't declare an inline Function to have the same Function instance in order to pass to {@link SignalRService.unregister}.
   */
  register<T extends ReceivedMethods>(method: T, callback: (params: ReceivedResponses[T]) => void) {
    this.connection.on(method, callback);
  }

  /**
   * @param  {T} method The name of the method to remove handler for
   * @param  {(params:ReceivedResponses[T])=>void} callback? The handler to remove. This must be the same Function instance as the one passed to {@link SignalRService.register}. If no callback passed, all the handlers for the method are removed.
   *
   */
  unregister<T extends ReceivedMethods>(
    method: T,
    callback?: (params: ReceivedResponses[T]) => void
  ) {
    if (callback) this.connection.off(method, callback);
    else this.connection.off(method);
  }

  send<T extends SentMethods>(method: T, params: SentParams[T]) {
    this.connection.invoke(method, params);
  }

  start() {
    return this.connection.start();
  }

  stop() {
    return this.connection.stop();
  }
}

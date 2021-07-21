import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import * as domino from 'domino';
import * as fs from 'fs';
import * as path from 'path';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
console.log('================================');
console.log(__dirname);

const template = fs.readFileSync(path.join(__dirname, '..', 'browser', 'index.html')).toString();
const win: any = domino.createWindow(template);
global['window'] = win as Window & typeof globalThis;
global['document'] = win.document;
global['IntersectionObserver'] = win.IntersectionObserver;

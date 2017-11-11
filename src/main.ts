import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import './assets/styles/app.scss';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'Production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);

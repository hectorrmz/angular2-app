import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import {TimesEntryModule} from './times-entry/times-entry.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    TimesEntryModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
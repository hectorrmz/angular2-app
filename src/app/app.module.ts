import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// App Modules
import { SharedModule } from './shared/shared.module';
import {TimesEntryModule} from './times-entry/times-entry.module';

// app Component
import { AppComponent } from './app.component';

//Services
import { AuthService } from './services/auth.service';
import { AuthHelper } from './services/auth-helper.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RedMineService } from './services/redmine.service';

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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    AuthHelper,
    AuthGuardService,
    RedMineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
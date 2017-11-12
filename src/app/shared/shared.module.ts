import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LaddaModule } from 'angular2-ladda';

import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from '../login/login.component';
import { TimesEntryComponent } from '../times-entry/times-entry.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', component:TimesEntryComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    LaddaModule.forRoot({
      style: 'zoom-in',
      spinnerSize: 30,
      spinnerColor: '#fff'
    })
  ],
  declarations: [
    LayoutComponent,
    LoginComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule { }
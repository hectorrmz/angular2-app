import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from '../login/login.component';
import { TimesEntryComponent } from '../times-entry/times-entry.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'calendar', component:TimesEntryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
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
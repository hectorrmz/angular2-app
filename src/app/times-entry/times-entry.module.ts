import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesEntryComponent } from './times-entry.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { ProjectComponent } from './components/project/project.component';
import { IssuesComponent } from './components/issues/issues.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimesEntryComponent,
        WeekViewComponent,
        ProjectComponent,
        IssuesComponent
    ]
})
export class TimesEntryModule { }
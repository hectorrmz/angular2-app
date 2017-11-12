import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesEntryComponent } from './times-entry.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { ProjectComponent, FilterIssueByProject } from './components/project/project.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimesEntryComponent,
        WeekViewComponent,
        ProjectComponent,
        FilterIssueByProject
    ]
})
export class TimesEntryModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesEntryComponent } from './times-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WeekViewComponent } from './components/calendar/week-view/week-view.component';
import { ProjectComponent, FilterIssueByProject } from './components/project/project.component';

//Services
import { CalendarHelper } from '../services/calendar-helper.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimesEntryComponent,
        CalendarComponent,
        WeekViewComponent,
        ProjectComponent,
        FilterIssueByProject
    ],
    providers:[
        CalendarHelper
    ]
})
export class TimesEntryModule { }
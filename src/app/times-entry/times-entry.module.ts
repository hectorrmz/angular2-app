import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { TimesEntryComponent } from './times-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WeekViewComponent } from './components/calendar/week-view/week-view.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProjectComponent, FilterIssueByProject } from './components/project/project.component';

//Services
import { CalendarHelper } from '../services/calendar-helper.service';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule
    ],
    declarations: [
        TimesEntryComponent,
        CalendarComponent,
        WeekViewComponent,
        ProjectComponent,
        ModalComponent,
        FilterIssueByProject
    ],
    providers: [
        CalendarHelper
    ]
})
export class TimesEntryModule { }
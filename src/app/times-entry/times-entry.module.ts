import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { TimesEntryComponent } from './times-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WeekViewComponent } from './components/calendar/week-view/week-view.component';
import { ModalComponent } from './components/calendar/modal-form/modal.component';
import { ProjectComponent, FilterIssueByProject } from './components/project/project.component';

//Services
import { CalendarHelper } from '../services/calendar-helper.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
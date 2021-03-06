import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { TimesEntryComponent } from './times-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WeekViewComponent } from './components/calendar/week-view/week-view.component';
import { DayViewComponent } from './components/calendar/day-view/day-view.component';
import { ModalComponent } from './components/calendar/modal-form/modal.component';
import {
  ProjectComponent,
  FilterIssueByProject,
} from './components/project/project.component';
import { OptionsComponent } from './components/options/options.component';
import { OutlookComponent } from './components/outlook/outlook.component';

//Services
import { CalendarHelper, OutlookService } from '../services';

@NgModule({
  imports: [CommonModule, FormsModule, DndModule.forRoot()],
  declarations: [
    TimesEntryComponent,
    CalendarComponent,
    WeekViewComponent,
    DayViewComponent,
    ProjectComponent,
    ModalComponent,
    OptionsComponent,
    FilterIssueByProject,
    OutlookComponent,
  ],
  providers: [CalendarHelper, OutlookService],
})
export class TimesEntryModule {}

import { Component, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as moment from 'moment';

import { CalendarHelper } from '../../../services/calendar-helper.service';
import { RedMineService } from '../../../services/redmine.service';

import { Week, Day, Time } from '../../../models/Calendar';
import { TimeEntry, Activity } from '../../../models/Redmine';

@Component({
    selector: 'app-calendar',
    styleUrls: ['./calendar.component.scss'],
    templateUrl: './calendar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnChanges {

    @Input() entries: Array<TimeEntry>;
    @Input() activities: Array<Activity>;

    weeks: Array<Week> = [];
    times: Array<Time> = [];

    selected: Time;

    currentView: number;

    constructor(private calendarHelper: CalendarHelper, private redMineService: RedMineService) {

        this.setdaysRange();
        this.currentView = 0;
    }

    setdaysRange() {
        let now = new Date();

        let firstDay: number = now.getDate() <= 15 ? 1 : 16;
        let end: number = now.getDate() <= 15 ? 15 : this.calendarHelper.daysInMonth(now.getMonth(), now.getFullYear());

        let initial = new Date(`${now.getMonth() + 1}/${firstDay}/${now.getFullYear()}`);

        let initialNumber: number = initial.getDay(); // 0-6
        let dayNumber = initial.getDate(); // date 1
        let skip = false;

        while (end > dayNumber) {

            let week = new Week();

            week.days.forEach((day: Day, index) => {

                if ((index >= initialNumber || skip) && dayNumber <= end) {
                    day.date = dayNumber;
                    day.times.date = moment(`${now.getMonth() + 1}-${dayNumber}-${now.getFullYear()}`).format('YYYY-MM-DD');
                    dayNumber++;
                }
            });

            skip = true;

            this.weeks.push(week);
        }
    }

    createTimeEntries() {

        this.entries.forEach((time: TimeEntry) => {

            let date = moment(time.spent_on).date();

            let entry: Time = {
                title: time.comments,
                duration: time.hours,
                date: date,
                activity: time.activity
            };

            this.times.push(entry);
        });

        this.setLoggedTimeEntries();

    }

    setLoggedTimeEntries() {

        this.weeks.forEach((week: Week) => {

            week.days.forEach((day: Day) => {

                day.times.entries = this.times.filter((entry) =>
                    entry.date === day.date
                );

            });

        });
    }

    getTotal(entries: Array<Time>): number {
        let total: number = 0;

        for (let i = 0, _len = entries.length; i < _len; i++) {
            total += entries[i].duration;
        }

        return total;
    }

    ngOnChanges(changes) {
        console.log(changes);
        this.createTimeEntries();
    }

    saveTimes() {

        let newEntries: Time[] = [];

        this.weeks.forEach((week: Week) => {

            week.days.forEach((day: Day) => {

                day.times.entries.forEach((time: Time) => {
                    if (time.isNew) {
                        newEntries.push(time);
                    }
                });

            });

        });

        console.log(newEntries);
        if (confirm('Are you sure you want to submit this times entries?')) {
            this.redMineService.setTimeEntries(newEntries)
                .subscribe((response: any) =>
                    console.log(response)
                );
        }
    }
}
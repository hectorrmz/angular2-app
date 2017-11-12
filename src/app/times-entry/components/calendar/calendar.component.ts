import { Component, ViewEncapsulation, Input } from '@angular/core';
import { CalendarHelper } from '../../../services/calendar-helper.service';
import { Week, Day, Time } from '../../../models/Calendar';

@Component({
    selector: 'app-calendar',
    styleUrls: ['./calendar.component.scss'],
    templateUrl: './calendar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

    @Input() entries: Array<Time>;

    weeks: Array<Week> = [];
    onAddTime: Function;
    selected: Time;

    currentView: number;

    constructor(private calendarHelper: CalendarHelper) {
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

            week.weekDays.forEach((day: Day, index) => {

                if ((index >= initialNumber || skip) && dayNumber <= end) {
                    day.date = dayNumber;
                    day.times.date = `${now.getFullYear()}-${now.getMonth() + 1}-${dayNumber}`;
                    dayNumber++;
                }
            });

            skip = true;

            this.weeks.push(week);
        }
    }

    setLoggedTimeEntries() {

        this.weeks.forEach((week: Week) => {

            week.weekDays.forEach((day: Day) => {

                day.times.entries = this.entries.filter((entry) =>
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
}
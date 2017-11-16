import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Week, Time } from '../../../../models/Calendar';
import { Activity } from '../../../../models/Redmine';

@Component({
    selector: 'week-view',
    styleUrls: ['week-view.component.scss'],
    templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
    @Input() weeks: Array<Week>;
    @Input() view: number;
    @Input() activities: Array<Activity>;

    time: Time = {
        activity: { id: 0, name: '' },
        date: 0,
        duration: 0,
        isNew: true,
        title: ''
    };

    constructor() { }

    save(form: NgForm) {
        console.log(form.controls);
    }
}
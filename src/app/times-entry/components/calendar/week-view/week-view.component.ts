import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
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

    constructor(private dragulaService: DragulaService) {
        this.dragulaService.setOptions('bag-one', {
            moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
        });
    }

    save(form: NgForm) {
        console.log(form.controls);
    }
}
import { Component, Input } from '@angular/core';
import { Day, Time } from '../../../../models/Calendar';
import { Activity } from '../../../../models/Redmine';

@Component({
    selector: 'day-view',
    styleUrls: ['./day-view.component.scss'],
    templateUrl: './day-view.component.html'
})
export class DayViewComponent {

    @Input() day: Day;
    @Input() activities: Array<Activity>;

    sumTotal($event: Time[]) {
    }

    transferDataSuccess($event, modal: any) {
        let time: Time = new Time();
        time.activity = { ...$event.dragData.activity };
        modal.show(this.day, time);
    }

}
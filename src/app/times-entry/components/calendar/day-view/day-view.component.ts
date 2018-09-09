import { Component, Input, SimpleChanges } from '@angular/core';
import { Day, Time } from '../../../../models/Calendar';
import { Activity } from '../../../../models/Redmine';
import { ModalComponent } from '../modal-form/modal.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'day-view',
    styleUrls: ['./day-view.component.scss'],
    templateUrl: './day-view.component.html'
})
export class DayViewComponent implements OnChanges {

    @Input() day: Day;
    @Input() activities: Array<Activity>;

    total: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['day']){
            this.sumTotal();
        }
    }

    sumTotal() {
        let hours = 0;

        this.day.times.entries.forEach((time: Time) => {
            hours = hours + time.duration;
        });

        this.total = hours;
    }

    transferDataSuccess($event, modal: any) {
        let time: Time = new Time();
        time.activity = { ...$event.dragData.activity };
        modal.show(this.day, time, true);
    }

    editTime(modal: ModalComponent, time: Time){
        modal.show(this.day, time);
    }

    removeTime(index: number){
        this.day.times.entries.splice(index, 1);
        this.sumTotal();
    }

}
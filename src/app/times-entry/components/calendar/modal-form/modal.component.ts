import { ViewEncapsulation, Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Time, Day } from '../../../../models/Calendar';
import { Activity } from '../../../../models/Redmine';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

    @Input() activities: Activity[];
    @Output() timePushed: EventEmitter<Time[]> = new EventEmitter<Time[]>();

    visible = false;
    visibleAnimate = false;
    time: Time = new Time();
    day: Day;
    entries: Time[];

    timeDate: string;

    show(day: Day): void {

        this.time = new Time();
        this.day = day;
        this.entries = day.times.entries;
        this.timeDate = moment(this.day.times.date).format('MMMM Do YYYY');

        this.visible = true;
        this.visibleAnimate = true;
    }

    hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }

    save(form: NgForm) {
        this.time.isNew = true;
        this.time.date = this.day.times.date;
        this.entries.push(this.time);
        this.timePushed.emit(this.entries);
        this.hide();
    }
}
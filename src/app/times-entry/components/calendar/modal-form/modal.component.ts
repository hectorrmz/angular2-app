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
    isNew = false;
    time: Time = new Time();
    editableTime: Time;
    day: Day;
    entries: Time[];

    timeDate: string;

    show(day: Day, time?: Time, isNew?: boolean): void {
        this.isNew = isNew;
        this.time = new Time();
        this.day = day;
        this.entries = day.times.entries;
        this.timeDate = moment(this.day.times.date).format('MMMM Do YYYY');

        if (time && isNew) {
            this.time.activity = time.activity;
        } else if (time) {
            this.editableTime = time;
            this.time = time;
        }

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

        if (form.valid) {
            this.time.isNew = true;
            this.time.date = this.day.times.date;

            this.time.title = form.controls['description'].value;
            this.time.duration = form.controls['hour'].value;
            this.time.activity.id = form.controls['activity'].value;

            if (this.isNew) {
                this.entries.push(this.time);
            } else {
                this.editableTime = this.time;
            }
            this.timePushed.emit(this.entries);
            this.hide();
        }
    }
}
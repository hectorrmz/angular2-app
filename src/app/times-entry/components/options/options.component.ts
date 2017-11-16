import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from '../../../models/Redmine';
import { Time } from '../../../models/Calendar';

@Component({
    selector: 'app-options',
    styleUrls: ['./options.component.scss'],
    templateUrl: './options.component.html'
})
export class OptionsComponent implements OnChanges {

    @Input() activities: Activity[];

    times: Time[] = [];

    ngOnChanges(changes: SimpleChanges) {

        if (this.activities) {
            this.activities.forEach((activity: Activity) => {

                let time = new Time();

                time.title = '';
                time.duration = 0;
                time.activity = activity;
                time.isNew = true;
                time.date = 0;

                this.times.push(time);

            });
        }

    }
}
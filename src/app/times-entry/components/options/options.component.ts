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

    transferData: Object = { id: 1, msg: 'Hello' };
    receivedData: Array<any> = [];

    dragOperation: boolean = false;

    containers: Array<Container> = [
        new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
        new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
        new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
    ];

    widgets: Array<Widget> = [];
    addTo($event: any) {
        if ($event) {
            this.widgets.push($event.dragData);
        }
    }

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

    transferDataSuccess($event: any) {
        this.receivedData.push($event.dragData);
    }
}

class Container {
    constructor(public id: number, public name: string, public widgets: Array<Widget>) { }
}

class Widget {
    constructor(public name: string) { }
}
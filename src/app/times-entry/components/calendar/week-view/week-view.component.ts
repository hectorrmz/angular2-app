import { Component, Input } from '@angular/core';
import { Week } from '../../../../models/Calendar';

@Component({
    selector: 'week-view',
    styleUrls: ['week-view.component.scss'],
    templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
    @Input() weeks: Array<Week>;
    @Input() view: number;

    constructor(){

    }
}
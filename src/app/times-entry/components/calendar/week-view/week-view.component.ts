import { Component, Input } from '@angular/core';
import { Week } from '../../../../models/Calendar';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'week-view',
    styleUrls: ['week-view.component.scss'],
    templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
    @Input() weeks: Array<Week>;
    @Input() view: number;

    constructor(private dragulaService: DragulaService) {
        this.dragulaService.setOptions('bag-one', {
            moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
        });
    }
}
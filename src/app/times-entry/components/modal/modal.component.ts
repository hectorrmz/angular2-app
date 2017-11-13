import { ViewEncapsulation, Component } from '@angular/core';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

    visible = false;
    visibleAnimate = false;

    show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
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
}
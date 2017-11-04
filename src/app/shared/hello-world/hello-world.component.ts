import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  styleUrls: ['./hello-world.component.scss'],
  templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent {
  message: string = 'Hello World!';
}
import { TestBed } from '@angular/core/testing';
import { HelloWorldComponent } from './hello-world.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [HelloWorldComponent] });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(HelloWorldComponent);

    expect(fixture.componentInstance instanceof HelloWorldComponent).toBe(true);
  });
})
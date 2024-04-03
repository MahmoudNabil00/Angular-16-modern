import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSignalComponent } from './input-signal.component';

describe('InputSignalComponent', () => {
  let component: InputSignalComponent;
  let fixture: ComponentFixture<InputSignalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSignalComponent]
    });
    fixture = TestBed.createComponent(InputSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

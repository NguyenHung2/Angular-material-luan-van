import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMapComponent } from './schedule-map.component';

describe('ScheduleMapComponent', () => {
  let component: ScheduleMapComponent;
  let fixture: ComponentFixture<ScheduleMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleMapComponent]
    });
    fixture = TestBed.createComponent(ScheduleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

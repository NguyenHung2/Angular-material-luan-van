import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScheduleDestinationComponent } from './manage-schedule-destination.component';

describe('ManageScheduleDestinationComponent', () => {
  let component: ManageScheduleDestinationComponent;
  let fixture: ComponentFixture<ManageScheduleDestinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageScheduleDestinationComponent]
    });
    fixture = TestBed.createComponent(ManageScheduleDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleDestinationDialogComponent } from './add-schedule-destination-dialog.component';

describe('AddScheduleDestinationDialogComponent', () => {
  let component: AddScheduleDestinationDialogComponent;
  let fixture: ComponentFixture<AddScheduleDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScheduleDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(AddScheduleDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

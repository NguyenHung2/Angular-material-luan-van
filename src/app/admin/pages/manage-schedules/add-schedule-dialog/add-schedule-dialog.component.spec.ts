import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleDialogComponent } from './add-schedule-dialog.component';

describe('AddScheduleDialogComponent', () => {
  let component: AddScheduleDialogComponent;
  let fixture: ComponentFixture<AddScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(AddScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleDestinationDialogComponent } from './edit-schedule-destination-dialog.component';

describe('EditScheduleDestinationDialogComponent', () => {
  let component: EditScheduleDestinationDialogComponent;
  let fixture: ComponentFixture<EditScheduleDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditScheduleDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(EditScheduleDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

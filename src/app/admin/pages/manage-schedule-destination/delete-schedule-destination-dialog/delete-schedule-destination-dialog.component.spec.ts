import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleDestinationDialogComponent } from './delete-schedule-destination-dialog.component';

describe('DeleteScheduleDestinationDialogComponent', () => {
  let component: DeleteScheduleDestinationDialogComponent;
  let fixture: ComponentFixture<DeleteScheduleDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteScheduleDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteScheduleDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScheduleDestinationDialogComponent } from './detail-schedule-destination-dialog.component';

describe('DetailScheduleDestinationDialogComponent', () => {
  let component: DetailScheduleDestinationDialogComponent;
  let fixture: ComponentFixture<DetailScheduleDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailScheduleDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(DetailScheduleDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

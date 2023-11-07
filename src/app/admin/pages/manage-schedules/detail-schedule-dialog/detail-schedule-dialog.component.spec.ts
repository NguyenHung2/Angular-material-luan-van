import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScheduleDialogComponent } from './detail-schedule-dialog.component';

describe('DetailScheduleDialogComponent', () => {
  let component: DetailScheduleDialogComponent;
  let fixture: ComponentFixture<DetailScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(DetailScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

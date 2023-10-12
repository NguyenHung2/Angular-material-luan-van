import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchedulesComponent } from './manage-schedules.component';

describe('ManageSchedulesComponent', () => {
  let component: ManageSchedulesComponent;
  let fixture: ComponentFixture<ManageSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSchedulesComponent]
    });
    fixture = TestBed.createComponent(ManageSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

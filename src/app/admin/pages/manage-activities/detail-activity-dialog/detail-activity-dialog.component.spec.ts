import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActivityDialogComponent } from './detail-activity-dialog.component';

describe('DetailActivityDialogComponent', () => {
  let component: DetailActivityDialogComponent;
  let fixture: ComponentFixture<DetailActivityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailActivityDialogComponent]
    });
    fixture = TestBed.createComponent(DetailActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

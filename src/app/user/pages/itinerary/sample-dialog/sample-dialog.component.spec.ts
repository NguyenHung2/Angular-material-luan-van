import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDialogComponent } from './sample-dialog.component';

describe('SampleDialogComponent', () => {
  let component: SampleDialogComponent;
  let fixture: ComponentFixture<SampleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleDialogComponent]
    });
    fixture = TestBed.createComponent(SampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

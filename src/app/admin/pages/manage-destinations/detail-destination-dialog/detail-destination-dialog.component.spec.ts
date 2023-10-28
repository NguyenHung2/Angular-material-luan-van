import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDestinationDialogComponent } from './detail-destination-dialog.component';

describe('DetailDestinationDialogComponent', () => {
  let component: DetailDestinationDialogComponent;
  let fixture: ComponentFixture<DetailDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(DetailDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

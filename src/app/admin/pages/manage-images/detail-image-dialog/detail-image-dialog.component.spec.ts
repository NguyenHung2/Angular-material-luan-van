import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImageDialogComponent } from './detail-image-dialog.component';

describe('DetailImageDialogComponent', () => {
  let component: DetailImageDialogComponent;
  let fixture: ComponentFixture<DetailImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailImageDialogComponent]
    });
    fixture = TestBed.createComponent(DetailImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostDialogComponent } from './detail-post-dialog.component';

describe('DetailPostDialogComponent', () => {
  let component: DetailPostDialogComponent;
  let fixture: ComponentFixture<DetailPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPostDialogComponent]
    });
    fixture = TestBed.createComponent(DetailPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

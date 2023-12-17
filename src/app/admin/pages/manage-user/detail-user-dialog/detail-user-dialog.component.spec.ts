import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserDialogComponent } from './detail-user-dialog.component';

describe('DetailUserDialogComponent', () => {
  let component: DetailUserDialogComponent;
  let fixture: ComponentFixture<DetailUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUserDialogComponent]
    });
    fixture = TestBed.createComponent(DetailUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListDialogComponent } from './add-list-dialog.component';

describe('AddListDialogComponent', () => {
  let component: AddListDialogComponent;
  let fixture: ComponentFixture<AddListDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddListDialogComponent]
    });
    fixture = TestBed.createComponent(AddListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

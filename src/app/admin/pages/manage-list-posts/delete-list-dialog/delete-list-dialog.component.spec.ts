import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListDialogComponent } from './delete-list-dialog.component';

describe('DeleteListDialogComponent', () => {
  let component: DeleteListDialogComponent;
  let fixture: ComponentFixture<DeleteListDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteListDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinationCategoryDialogComponent } from './edit-destination-category-dialog.component';

describe('EditDestinationCategoryDialogComponent', () => {
  let component: EditDestinationCategoryDialogComponent;
  let fixture: ComponentFixture<EditDestinationCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDestinationCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(EditDestinationCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostCategoryDialogComponent } from './edit-post-category-dialog.component';

describe('EditPostCategoryDialogComponent', () => {
  let component: EditPostCategoryDialogComponent;
  let fixture: ComponentFixture<EditPostCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPostCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(EditPostCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

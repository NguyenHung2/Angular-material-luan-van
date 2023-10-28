import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDestinationCategoryDialogComponent } from './delete-destination-category-dialog.component';

describe('DeleteDestinationCategoryDialogComponent', () => {
  let component: DeleteDestinationCategoryDialogComponent;
  let fixture: ComponentFixture<DeleteDestinationCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDestinationCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteDestinationCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

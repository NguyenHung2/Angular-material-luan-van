import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinationCategoryDialogComponent } from './add-destination-category-dialog.component';

describe('AddDestinationCategoryDialogComponent', () => {
  let component: AddDestinationCategoryDialogComponent;
  let fixture: ComponentFixture<AddDestinationCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDestinationCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(AddDestinationCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDestinationCategoryComponent } from './manage-destination-category.component';

describe('ManageDestinationCategoryComponent', () => {
  let component: ManageDestinationCategoryComponent;
  let fixture: ComponentFixture<ManageDestinationCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDestinationCategoryComponent]
    });
    fixture = TestBed.createComponent(ManageDestinationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

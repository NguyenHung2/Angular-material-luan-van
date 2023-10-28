import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListPostsComponent } from './manage-list-posts.component';

describe('ManageListPostsComponent', () => {
  let component: ManageListPostsComponent;
  let fixture: ComponentFixture<ManageListPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageListPostsComponent]
    });
    fixture = TestBed.createComponent(ManageListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlacesComponent } from './featured-places.component';

describe('FeaturedPlacesComponent', () => {
  let component: FeaturedPlacesComponent;
  let fixture: ComponentFixture<FeaturedPlacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedPlacesComponent]
    });
    fixture = TestBed.createComponent(FeaturedPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

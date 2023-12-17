import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryCreatorComponent } from './itinerary-creator.component';

describe('ItineraryCreatorComponent', () => {
  let component: ItineraryCreatorComponent;
  let fixture: ComponentFixture<ItineraryCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItineraryCreatorComponent]
    });
    fixture = TestBed.createComponent(ItineraryCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

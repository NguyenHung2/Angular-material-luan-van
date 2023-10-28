import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDestinationDialogComponent } from './delete-destination-dialog.component';

describe('DeleteDestinationDialogComponent', () => {
  let component: DeleteDestinationDialogComponent;
  let fixture: ComponentFixture<DeleteDestinationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDestinationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteDestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

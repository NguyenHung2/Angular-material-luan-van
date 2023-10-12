import { TestBed } from '@angular/core/testing';

import { ManageDestinationService } from './manage-destination.service';

describe('ManageDestinationService', () => {
  let service: ManageDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

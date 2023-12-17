import { TestBed } from '@angular/core/testing';

import { ScheduleDestinationService } from './schedule-destination.service';

describe('ScheduleDestinationService', () => {
  let service: ScheduleDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DayServiceService } from './day-service.service';

describe('DayServiceService', () => {
  let service: DayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

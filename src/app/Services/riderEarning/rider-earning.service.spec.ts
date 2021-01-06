import { TestBed } from '@angular/core/testing';

import { RiderEarningService } from './rider-earning.service';

describe('RiderEarningService', () => {
  let service: RiderEarningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderEarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

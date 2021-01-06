import { TestBed } from '@angular/core/testing';

import { DailyReturnService } from './daily-return.service';

describe('DailyReturnService', () => {
  let service: DailyReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DeliveryRecordService } from './delivery-record.service';

describe('DeliveryRecordService', () => {
  let service: DeliveryRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

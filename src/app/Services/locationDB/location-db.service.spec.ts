import { TestBed } from '@angular/core/testing';

import { LocationDBService } from './location-db.service';

describe('LocationDBService', () => {
  let service: LocationDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

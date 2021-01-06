import { TestBed } from '@angular/core/testing';

import { ResturantModelService } from './resturant-model.service';

describe('ResturantModelService', () => {
  let service: ResturantModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResturantModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

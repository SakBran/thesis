import { TestBed } from '@angular/core/testing';

import { MainModelService } from './main-model.service';

describe('MainModelService', () => {
  let service: MainModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

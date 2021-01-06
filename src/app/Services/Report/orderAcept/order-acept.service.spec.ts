import { TestBed } from '@angular/core/testing';

import { OrderAceptService } from './order-acept.service';

describe('OrderAceptService', () => {
  let service: OrderAceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ShopSelectionServiceService } from './shop-selection-service.service';

describe('ShopSelectionServiceService', () => {
  let service: ShopSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

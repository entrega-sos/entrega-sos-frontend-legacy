import { TestBed } from '@angular/core/testing';

import { BairrosService } from './bairros.service';

describe('BairrosService', () => {
  let service: BairrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BairrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

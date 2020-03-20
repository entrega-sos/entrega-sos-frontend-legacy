import { TestBed } from '@angular/core/testing';

import { ComercianteService } from './comerciante.service';

describe('ComercianteService', () => {
  let service: ComercianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComercianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

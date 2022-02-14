import { TestBed } from '@angular/core/testing';

import { EstadisticaMesService } from './estadistica-mes.service';

describe('EstadisticaMesService', () => {
  let service: EstadisticaMesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticaMesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

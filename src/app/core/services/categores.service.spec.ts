import { TestBed } from '@angular/core/testing';

import { CategoresService } from './categores.service';

describe('CategoresService', () => {
  let service: CategoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

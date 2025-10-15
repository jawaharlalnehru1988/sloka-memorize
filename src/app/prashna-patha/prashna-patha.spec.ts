import { TestBed } from '@angular/core/testing';

import { PrashnaPatha } from './prashna-patha';

describe('PrashnaPatha', () => {
  let service: PrashnaPatha;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrashnaPatha);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

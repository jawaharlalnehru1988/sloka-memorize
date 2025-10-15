import { TestBed } from '@angular/core/testing';

import { ArthaPatha } from './artha-patha';

describe('ArthaPatha', () => {
  let service: ArthaPatha;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArthaPatha);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

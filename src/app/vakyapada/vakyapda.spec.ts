import { TestBed } from '@angular/core/testing';

import { Vakyapda } from './vakyapda';

describe('Vakyapda', () => {
  let service: Vakyapda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vakyapda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

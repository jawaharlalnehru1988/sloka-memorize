import { TestBed } from '@angular/core/testing';

import { NumberToVerse } from './number-to-verse';

describe('NumberToVerse', () => {
  let service: NumberToVerse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberToVerse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

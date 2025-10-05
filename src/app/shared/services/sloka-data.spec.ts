import { TestBed } from '@angular/core/testing';

import { SlokaData } from './sloka-data';

describe('SlokaData', () => {
  let service: SlokaData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlokaData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

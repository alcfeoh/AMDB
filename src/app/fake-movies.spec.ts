import { TestBed } from '@angular/core/testing';

import { FakeMovies } from './fake-movies';

describe('FakeMovies', () => {
  let service: FakeMovies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeMovies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

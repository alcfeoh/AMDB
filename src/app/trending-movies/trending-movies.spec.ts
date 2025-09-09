import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMovies } from './trending-movies';

describe('TrendingMovies', () => {
  let component: TrendingMovies;
  let fixture: ComponentFixture<TrendingMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

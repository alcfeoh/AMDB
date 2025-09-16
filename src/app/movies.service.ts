import {inject, Injectable, Signal, signal} from '@angular/core';
import {httpResource, HttpResourceRef} from '@angular/common/http';
import {MovieDetails, SearchResponse} from '../types';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  readonly trendingMovies = httpResource<SearchResponse>(
    () => `http://localhost:3000/trending`,
    {defaultValue: {page: 0, results: [], total_pages: 0, total_results: 0}}
  );

  private readonly searchQuery = signal<string>("");
  readonly movieSearchResult = httpResource<SearchResponse>(
    () => ({url: `http://localhost:3000/search?query=${this.searchQuery()}`}),
    {defaultValue: {page: 0, results: [], total_pages: 0, total_results: 0}}
  );

  updateSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  getMovieDetails(movieId: Signal<number>): HttpResourceRef<MovieDetails | undefined> {
    return httpResource<MovieDetails>(
      () => ({url: `http://localhost:3000/details?id=${movieId()}`})
    )
  }
}

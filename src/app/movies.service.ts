import {Injectable, signal} from '@angular/core';
import {httpResource, HttpResourceRef} from '@angular/common/http';
import {SearchResponse} from '../types';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly trendingMovies: HttpResourceRef<SearchResponse> = httpResource<SearchResponse>(
    () => ({url: `http://localhost:3000/trending`}),
    {defaultValue: {page: 0, results: [], total_pages: 0, total_results: 0}}
  );
  private readonly searchQuery = signal("");
  readonly movieSearchResult = httpResource<SearchResponse>(
    () => ({url: `http://localhost:3000/search?query=${this.searchQuery()}`}),
    {defaultValue: {page: 0, results: [], total_pages: 0, total_results: 0}}
  );

  updateSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}

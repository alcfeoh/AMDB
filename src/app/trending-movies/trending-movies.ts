import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {SearchResponse} from '../../types';
import {MoviesService} from '../movies.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-trending-movies',
  imports: [
    MatCard,
    MatTableModule,
    NgClass,
    DatePipe,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './trending-movies.html',
  styleUrl: './trending-movies.scss'
})
export class TrendingMovies {
  // Columns to be displayed in the table. The order here matters.
  displayedColumns: string[] = ['title', 'poster_path', 'release_date', 'vote_average'];

  moviesService = inject(MoviesService);
  // The data source for the table, which is our array of movies.
  dataSource$ = inject(HttpClient).get<SearchResponse>("http://localhost:3000/trending");

  /**
   * Returns a CSS class based on the movie rating to color-code it.
   * @param rating The rating of the movie.
   * @returns A string representing the CSS class.
   */
  getRatingColor(rating: number): string {
    console.log("get rating color");
    if (rating >= 8.0) {
      return 'rating-high';
    } else if (rating >= 6.0) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  }

  getRating(rating: number): string {
    return new Number(rating).toFixed(2).toLocaleString();
  }
}

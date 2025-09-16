import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {SearchResponse} from '../../types';
import {MoviesService} from '../movies.service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-trending-movies',
  imports: [
    MatCard,
    MatTableModule,
    NgClass,
    DecimalPipe,
    DatePipe,
    RouterLink,
    AsyncPipe,
    MatButton,
    MatBadge
  ],
  templateUrl: './trending-movies.html',
  styleUrl: './trending-movies.scss'
})
export class TrendingMovies {
  // Columns to be displayed in the table. The order here matters.
  displayedColumns: string[] = ['title', 'poster_path', 'release_date', 'vote_average'];

  moviesService = inject(MoviesService);

  /**
   * Returns a CSS class based on the movie rating to color-code it.
   * @param rating The rating of the movie.
   * @returns A string representing the CSS class.
   */
  getRatingColor(rating: number): string {
    console.log("get rating")
    if (rating >= 8.0) {
      return 'rating-high';
    } else if (rating >= 6.0) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  }
}

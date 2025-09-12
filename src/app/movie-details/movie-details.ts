import {Component, computed, inject, input, signal} from '@angular/core';
import {MoviesService} from '../movies.service';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetailsComponent {
  private moviesService = inject(MoviesService);
  id = input.required<number>();
  movie = this.moviesService.getMovieDetails(this.id);

  /**
   * Formats runtime from minutes to hours and minutes (e.g., 125 -> 2h 5m).
   */
  formatRuntime(minutes: number | null | undefined): string {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  /**
   * Returns a CSS class for color-coding the movie rating.
   */
  getRatingClass(rating: number | undefined): string {
    if (!rating) return 'rating-low';
    if (rating >= 8.0) return 'rating-high';
    if (rating >= 6.0) return 'rating-medium';
    return 'rating-low';
  }
}

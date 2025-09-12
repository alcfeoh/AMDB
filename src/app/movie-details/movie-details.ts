import {Component, inject, signal} from '@angular/core';
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

  movie = signal({
    "adult": false,
    "backdrop_path": "https://image.tmdb.org/t/p/w1280/8K9qHeM6G6QjQN0C5XKFGvK5lzM.jpg",
    "genre_ids": [
      28,
      878
    ],
    "id": 603,
    "original_language": "en",
    "original_title": "The Matrix",
    "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    "popularity": 18.7739,
    "poster_path": "https://image.tmdb.org/t/p/w500/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
    "release_date": "1999-03-31",
    "title": "The Matrix",
    "video": false,
    "vote_average": 8.232,
    "vote_count": 26774
  });

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

import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {NgClass} from '@angular/common';

export interface Movie {
  title: string;
  year: number;
  genre: string;
  rating: number;
}

// --- SAMPLE MOVIE DATA ---
const MOVIE_DATA: Movie[] = [
  { title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', rating: 9.3 },
  { title: 'The Godfather', year: 1972, genre: 'Crime', rating: 9.2 },
  { title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0 },
  { title: 'Pulp Fiction', year: 1994, genre: 'Crime', rating: 8.9 },
  { title: 'Forrest Gump', year: 1994, genre: 'Drama', rating: 8.8 },
  { title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8 },
  { title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8.7 },
  { title: 'Goodfellas', year: 1990, genre: 'Crime', rating: 8.7 },
  { title: 'Spirited Away', year: 2001, genre: 'Animation', rating: 8.6 },
  { title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6 },
];

@Component({
  selector: 'app-movie-list',
  imports: [
    MatCard,
    MatTableModule,
    NgClass
  ],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
  // Columns to be displayed in the table. The order here matters.
  displayedColumns: string[] = ['title', 'year', 'genre', 'rating'];

  // The data source for the table, which is our array of movies.
  dataSource = MOVIE_DATA;

  /**
   * Returns a CSS class based on the movie rating to color-code it.
   * @param rating The rating of the movie.
   * @returns A string representing the CSS class.
   */
  getRatingColor(rating: number): string {
    if (rating >= 9.0) {
      return 'rating-high';
    } else if (rating >= 8.7) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  }
}

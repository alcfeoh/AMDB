import {ChangeDetectionStrategy, Component, input, model} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {SearchResponse} from '../../types';


@Component({
  selector: 'app-movie-list',
  imports: [
    MatCard,
    MatTableModule,
    NgClass,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieList {
  // Columns to be displayed in the table. The order here matters.
  displayedColumns = model(['title', 'poster_path', 'release_date', 'vote_average']);

  dataSource = input.required<SearchResponse>();

  removeColumn(name: string) {
    this.displayedColumns.update(list => list.filter(col => col !== name));
  }

  /**
   * Returns a CSS class based on the movie rating to color-code it.
   * @param rating The rating of the movie.
   * @returns A string representing the CSS class.
   */
  getRatingColor(rating: number): string {
    if (rating >= 8.0) {
      return 'rating-high';
    } else if (rating >= 6.0) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  }
}

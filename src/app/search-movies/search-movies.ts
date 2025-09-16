import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MoviesService} from '../movies.service';
import {MovieDetails} from '../../types';
import {DatePipe} from '@angular/common';
import {MovieDetailsComponent} from '../movie-details/movie-details';

@Component({
  selector: 'app-search-movies',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    DatePipe,
    MovieDetailsComponent
  ],
  templateUrl: './search-movies.html',
  styleUrl: './search-movies.scss'
})
export class SearchMovies {
  moviesService = inject(MoviesService);
  moviesFound = this.moviesService.movieSearchResult.value;
  selectedMovie?: MovieDetails;

  selectMovie(event: MatAutocompleteSelectedEvent) {
    this.selectedMovie = event.option.value as MovieDetails;
  }
}

import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MovieList} from '../movie-list/movie-list';
import {HttpClient, httpResource} from '@angular/common/http';
import {SearchResponse} from '../../types';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbar,
    MatIcon,
    MatButton,
    MovieList
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  movieList = toSignal(
    inject(HttpClient).get<SearchResponse>("http://localhost:3000/search").pipe(map(res => res.results)),
    {initialValue: []}
  );

  movieListResource = httpResource<SearchResponse>(() => "http://localhost:3000/search");

}

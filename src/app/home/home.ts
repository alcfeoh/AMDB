import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TrendingMovies} from '../trending-movies/trending-movies';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbar,
    MatIcon,
    MatButton,
    TrendingMovies
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}

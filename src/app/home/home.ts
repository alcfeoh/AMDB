import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MovieList} from '../movie-list/movie-list';

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

}

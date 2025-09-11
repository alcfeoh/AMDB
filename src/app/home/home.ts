import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbar,
    MatIcon,
    MatButton,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
